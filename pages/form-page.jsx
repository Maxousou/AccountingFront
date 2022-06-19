import { Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useContext, useEffect, useState } from "react"
import * as yup from "yup"
import AppContext from "../src/AppContext"
import Button from "../src/components/Button"
import FormField from "../src/components/FormField"

const initialValues = {
  label: "",
  value: 0,
}
const validationSchema = yup.object().shape({
  label: yup.string().required().label("input label"),
  value: yup
    .number()
    .notOneOf([0], "Value must be different from 0")
    .required()
    .label("input value"),
})

const formPage = () => {
  const { ajouter, editer, obtenir, id } = useContext(AppContext)
  const [defaultValues, setDefaultValues] = useState(initialValues)
  const [item, setItem] = useState()

  const router = useRouter()

  const handleFormSubmit = useCallback(
    (input) => {
      if (id == null) {
        ajouter(input.label, input.value)
        router.push("/")
      } else {
        editer(id, input.label, input.value)
        router.push("/")
      }
    },
    [ajouter, editer, id, router]
  )

  useEffect(() => {
    const fetchData = async (id) => {
      Promise.resolve(obtenir(id)).then((i) => setItem(i))
    }

    if (id == null) {
      setDefaultValues({
        label: "",
        value: 0,
      })
    } else {
      fetchData(id)

      if (item) {
        setDefaultValues({
          label: item.data.titre,
          value: item.data.entry,
        })
      }
    }
  }, [id, item, obtenir, setItem])

  return (
    <>
      <div className="flex  flex-col items-center">
        <Formik
          onSubmit={(values) => {
            handleFormSubmit(values)
          }}
          initialValues={defaultValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ handleSubmit, isValid }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col w-2/3"
            >
              <FormField
                name="label"
                type="text"
                placeholder="What's this input's label"
                className="basis-[100%] flex-wrap"
              >
                Label
              </FormField>
              <FormField
                name="value"
                type="number"
                placeholder="Value"
                className="basis-[100%] flex-wrap"
              >
                Value
              </FormField>
              <Button type="submit" disabled={!isValid} customClassName="mt-7">
                ADD
              </Button>
            </form>
          )}
        </Formik>
        <Link href="/">
          <a>Cancel</a>
        </Link>
      </div>
    </>
  )
}
export default formPage
