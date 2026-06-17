import Login from "./Login"

function Navbar() {
  return (
   <>
  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem"}}>
    <div>
        DURA
    </div>
    <div>
        <Login />
    </div>



  </div>
   </>
  )
}

export default Navbar