import Link from "next/link"
import TableauComptable from "../src/components/TableauComptable"
const Home = () => {
  return (
    <div className="flex flex-col flex-wrap items-center">
      <div className="basis-[100%]">
        <h1 className="text-2xl mb-3">DASHBOARD</h1>
        <Link href="/form-page">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
            Add new entry
          </a>
        </Link>
      </div>
      <TableauComptable />
    </div>
  )
}
export default Home
