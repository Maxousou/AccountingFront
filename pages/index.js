import Link from "next/link"
import { useContext } from "react"
import AppContext from "../src/AppContext"
import TableauComptable from "../src/components/TableauComptable"

const Home = () => {
  const { setId } = useContext(AppContext)

  const handleClick = () => {
    setId(null)
  }

  return (
    <div className="flex flex-col flex-wrap items-center">
      <div className="basis-[100%]">
        <h1 className="text-2xl mb-3">ACCOUNTING</h1>
        <Link href="/form-page">
          <a
            onClick={handleClick}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
          >
            Add new entry
          </a>
        </Link>
      </div>
      <TableauComptable />
    </div>
  )
}
export default Home
