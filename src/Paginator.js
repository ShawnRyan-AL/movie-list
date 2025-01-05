export default function Paginator(props) {

  function onFirstClick() {
    props.onPageChange(1)
  }

  function onPreviousClick() {
    if (props.currentPage !== 1) {
      props.onPageChange(props.currentPage - 1)
    }
  }

  function onNextChange() {
    if (props.currentPage !== 500) {
      props.onPageChange(props.currentPage + 1)
    }
  }

  function onLastClick() {
    props.onPageChange(500)
  }

  return (
    <div>
      <button onClick={onFirstClick}>First</button>
      <button onClick={onPreviousClick}>Previous</button>
      <p>{props.currentPage} of 500</p>
      <button onClick={onNextChange}>Next</button>
      <button onClick={onLastClick}>Last</button>
    </div>
  )
}