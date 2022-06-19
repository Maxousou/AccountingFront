import classNames from "classnames"
import { useContext } from "react"
import AppContext from "../AppContext"
import Item from "./Item"
import PInt from "./PInt"

const TableauComptable = () => {
  const { state } = useContext(AppContext)

  return (
    <div className="w-3/4 mt-2">
      <table className="table-auto w-full border-collapse ">
        <thead>
          <tr>
            <th className="border border-gray-600">+</th>
            <th className="border border-gray-600">-</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state).map(([itemId, { label, value }]) => (
            <tr
              key={itemId}
              className={classNames(
                value >= 0 ? "Left" : "Right",
                itemId % 2 == 0 ? "bg-slate-100" : ""
              )}
            >
              <td className="border border-gray-300 w-2/5">
                {value > 0 ? (
                  <>
                    <Item label={label} value={value} />
                  </>
                ) : (
                  ""
                )}
              </td>
              <td className="border border-gray-300 w-2/5">
                {value <= 0 ? (
                  <>
                    <Item label={label} value={value} />
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
          <tr key="total">
            <td className="border border-gray-300">
              <div className="flex justify-between py-2 px-4">
                Total:
                <PInt
                  value={state
                    .filter((x) => x.value > 0)
                    .reduce((accumulator, { value }) => accumulator + value, 0)}
                />
              </div>
            </td>
            <td className="border border-gray-300">
              <div className="flex justify-between py-2 px-4">
                Total:
                <PInt
                  value={state
                    .filter((x) => x.value < 0)
                    .reduce(
                      (accumulator, { value }) => accumulator + parseInt(value),
                      0
                    )}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex  justify-between py-2 px-4">
        <p className="w-1"> Result: </p>
        <PInt
          value={state.reduce(
            (accumulator, { value }) => accumulator + parseInt(value),
            0
          )}
        />
      </div>
    </div>
  )
}
export default TableauComptable
