import classNames from "classnames"
import { useRouter } from "next/router"
import { useContext } from "react"
import AppContext from "./../AppContext"
import Item from "./Item"

const TableauComptable = () => {
  const { state, supprimer, setId } = useContext(AppContext)

  const router = useRouter()
  const handleDelete = (id) => {
    supprimer(id)
  }
  const handleEdit = (value) => {
    setId(value)
    router.push("/form-page")
  }

  if (!state) {
    return <>500</>
  }

  return (
    <div className="w-3/4 mt-2">
      <table className="table-auto w-full border-collapse ">
        <thead>
          <tr>
            <th className="border border-green-600">+</th>
            <th className="border border-red-600">-</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map(([itemId, { id, titre, entry }]) => (
            <tr
              key={itemId}
              className={classNames(
                entry >= 0 ? "Left" : "Right",
                itemId % 2 == 0 ? "bg-slate-100" : ""
              )}
            >
              <td className="border border-gray-300 w-2/5">
                {entry > 0 ? (
                  <>
                    <Item label={titre} value={entry} />
                  </>
                ) : (
                  ""
                )}
              </td>
              <td className="border border-gray-300 w-2/5">
                {entry <= 0 ? (
                  <>
                    <Item label={titre} value={entry} />
                  </>
                ) : (
                  ""
                )}
              </td>
              <td className="border border-gray-300 w-2/5">
                <button onClick={() => handleDelete(id)}>delete</button>
              </td>
              <td className="border border-gray-300 w-2/5">
                <button onClick={() => handleEdit(id)}>edit</button>
              </td>
            </tr>
          ))}
          <tr key="total">
            <td className="border border-gray-300">
              <div className="flex justify-between py-2 px-4">
                Total:
                <p>
                  {" "}
                  {state
                    .filter((x) => x.entry > 0)
                    .reduce((accumulator, { entry }) => accumulator + entry, 0)}
                </p>
              </div>
            </td>
            <td className="border border-gray-300">
              <div className="flex justify-between py-2 px-4">
                Total:
                <p>
                  {state
                    .filter((x) => x.entry < 0)
                    .reduce(
                      (accumulator, { entry }) => accumulator + parseInt(entry),
                      0
                    )}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex  justify-between py-2 px-4">
        <p className="w-1"> Result: </p>
        <p>
          {" "}
          {state.reduce(
            (accumulator, { entry }) => accumulator + parseInt(entry),
            0
          )}
        </p>
      </div>
    </div>
  )
}
export default TableauComptable
