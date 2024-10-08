import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useRegisterDealOwnerMutation } from '@/redux/features/dealOwnerAuthSlice';
import { useState, useEffect } from 'react';
import HandleFormErrorMessages from '@/components/HandleFormErrorMessages';

const Register = () => {
  const navigate = useNavigate();
  const [ registerDealOwner, { data } ] = useRegisterDealOwnerMutation();
  console.log(data)

  const [formData, setFormData] = useState({
    email: '', password: '', first_name: '', last_name: '', repeatPassword: ''
  });
  const [passwordRepeatErr, setPasswordRepeatErr] = useState(false);
  const [name, setName] = useState('');
  const [formErrors, setFormErrors] = useState(null);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value})
  }
  const checkPassword = () => {
    if(formData.password_confirmation === formData.password){
      setPasswordRepeatErr(false)
    } else {
      setPasswordRepeatErr(true)
    }
  }
  const getNames = () => {
    const names = name.trim().split(' ')
    setFormData({...formData, first_name: names[0], last_name: names[1]})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordRepeatErr(false);
    registerDealOwner(formData)
      .unwrap()
      .then((payload) => console.log(payload))
      .catch((error) => setFormErrors(error.data.errors));
  }
  
  useEffect(()=> {
    if (data && data.message === 'Registered new deal owner'){
      navigate('/do/login')
    }
  },[data, navigate])

  return (
    <>
      <div className='flex items-center flex-col h-[120vh] bg-authBg bg-cover bg-no-repeat bg-center'>
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8  text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark2.png' className='h-32' />
        </a>
        <h3 className='text-3xl text-grey300'>Create an account</h3>
        <p className='text-xl pb-5 text-grey300'>& post student deals!</p>
        <Card className='lg:w-[450px] h-max border-none shadow-none bg-transparent'>
          <CardContent>
            {formData.first_name ? <p className='text-grey300 pb-3'>Hi {formData.first_name} {formData.last_name}</p> : null }
            <form onSubmit={handleSubmit} >
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name' className='text-grey300'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    type='text'
                    className='bg-white border-grey200'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    onBlur={getNames}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'first_name'}
                    formData={formData}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'last_name'}
                    formData={formData}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='email' className='text-grey300'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    className='bg-white border-grey200'
                    value={formData.email}
                    onChange={(e)=> handleChange('email', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'email'}
                    formData={formData}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='password' className='text-grey300'>
                    Password
                  </Label>
                  <Input
                    id='password'
                    type='password'
                    className='bg-white border-grey200'
                    value={formData.password}
                    onChange={(e)=> handleChange('password', e.target.value)}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'password'}
                    formData={formData}
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='repeat-password' className='text-grey300'>
                    Repeat password
                  </Label>
                  <Input
                    id='repeat-password'
                    type='password'
                    className={`bg-white border-grey200 ${passwordRepeatErr ? 'border-red-500 border-2' : null}`}
                    value={formData.password_confirmation}
                    onChange={(e)=> handleChange('password_confirmation', e.target.value) }
                    onBlur={checkPassword}
                  />
                  <HandleFormErrorMessages
                    errors={formErrors}
                    field={'password_confirmation'}
                    formData={formData}
                  />
                  {passwordRepeatErr ? <p className="text-sm text-red-600">Password must match</p>: null}
                </div>
                <div className='mt-2'>
                <Button className='w-full font-semibold'>Sign up</Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='block'>
            <p className='text-grey300 text-center'>
              Already have an account?{' '}
              <span
                className='text-burgundy500 underline cursor-pointer'
                onClick={() => navigate('/do/login')}
              >
                Sign in
              </span>
            </p>
            <a href="/terms-and-conditions" className='block mx-auto text-center text-burgundy500 underline'>
              Terms and Conditions
            </a>
            <a href="/privacy" className='block mx-auto text-center text-burgundy500 underline'>
              Privacy Policy
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Register;
