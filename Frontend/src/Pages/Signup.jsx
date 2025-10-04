import React from 'react'
import SignupComponent from '../Components/Signup' // <-- changed to default import
function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <SignupComponent />
    </div>
  )
}

export default Signup