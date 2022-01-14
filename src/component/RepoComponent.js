


function RepoComponent(props) {
  return (
    <div className="repo" key={props.index}>
      <h3>repo {props.index + 1}</h3>
      <h2>{props.repo.name}</h2>

      <div className="details">
        <p>: {props.repo.html_url}</p>
        <p>: {props.repo.description}</p>
      </div>
    </div>
  )
}

export default RepoComponent;