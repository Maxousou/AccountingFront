// <p> that is an INTEGER
import classNames from "classnames"

const PInt = (props) => {
  const { value, className, ...otherProps } = props
  const variant = value > 0 ? "text-green-600" : "text-red-500"

  return (
    <p className={classNames(variant, className)} {...otherProps}>
      {value}
    </p>
  )
}
export default PInt
