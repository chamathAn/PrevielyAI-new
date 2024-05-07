import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom';
export default function AdmiProtectedRoute({ children }) {
const {user} = useUser();
const isAdmin = user?.publicMetadata?.role === "admin";
    return (
    <div>
      {
        isAdmin ? children : <Navigate to={'/'} />
      }
    </div>
  )
}
