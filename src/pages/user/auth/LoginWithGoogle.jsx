import supabase from '../../../utils/supabase';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const LoginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  return (
    <div>
        
    </div>
  )
}

export default LoginWithGoogle