function Welcome() {

  const username = localStorage.getItem("username")

  return (
    <div className="welcome-container">

      <h1>Welcome, {username}!</h1>

    </div>
  )
}

export default Welcome