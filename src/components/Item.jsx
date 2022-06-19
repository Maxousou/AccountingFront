import PInt from "./PInt"

const Item = (props) => {
  const { label, value } = props

  return (
    <div className="flex flex-col justify-center py-2 px-4">
      <PInt className="text-left" value={value} />
      <p>{label}</p>
    </div>
  )
}
export default Item
