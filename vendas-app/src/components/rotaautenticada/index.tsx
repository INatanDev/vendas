import { signIn, useSession } from 'next-auth/react'
import { Loader } from 'components'

interface RotaAutenticadaProps {
  children: React.ReactNode;
}

export const RotaAutenticada: React.FC<RotaAutenticadaProps> = (
  children 
) => {

  const { data: session, status } = useSession()

  const loading = status === 'loading'

  if(loading){
    return (
      <Loader show />
    )
  }

  if(!session && !loading){
    signIn()
    return null;
  }

  return (

    <div>
      { children.children }
    </div>
  )
}