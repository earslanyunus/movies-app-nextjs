import Input from "../components/Input";
import {Formik, Form, ErrorMessage} from "formik";
import Button from "../components/Button";
import * as Yup from 'yup';
import {signIn, signInWithGoogle} from "../firebase/index.js";
import { useRouter } from "next/router";

const signUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must be at least 8 characters.').max(50, 'Too Long!').required('Required'),
})

export default function Login() {
    const router = useRouter()
    
    const googleSignHandler = async () => {

        try {

            await signInWithGoogle()
            router.push('/')
        } catch (error) {
            console.log(`Hata:${error}`)
        }
    }
    return (
        // 20 px to rem =
        <div className='px-4 pt-14 pb-8 flex w-full lg:p-0 lg:h-screen lg:max-h-screen lg:min-h-[768px]'>
            <div className='flex flex-col items-center justify-between w-full   lg:w-1/2 lg:pr-8 lg:pt-14 lg:pb-8 lg:pl-20'>
                {/* <img className='hidden lg:block' src={'/'} alt="logo"/> */}
                <div className='w-full h-full flex flex-col items-center justify-center lg:w-1/2'>
                    {/* <img className='h-[32px] w-[32px] 2xl:h-[64px] 2xl:w-[64px] lg:hidden' src={logo} alt=""/> */}
                    <p className='text-display-xs font-semibold mt-6 lg:self-start'>Login to your account</p>
                    <p className='text-text-md font-normal mt-2 lg:self-start'>Welcome back! We missed you :)</p>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',


                        }
                        }
                        validationSchema={signUpSchema}
                        onSubmit={async values => {
                            try {
                                await signIn(values.email, values.password)
                                router.push('/')

                            }catch (error) {
                                console.log(`Hata:${error}`)




                            }
                        }
                        }
                    >
                        {({ handleSubmit}) => {

                            return (
                                <Form onSubmit={handleSubmit} className={'mt-8 flex flex-col gap-5 w-full '}>

                                    <div>
                                    <Input label='Email*' name='email' type='email' placeholder='Enter your email' extraClass={'mt-5'}/>
                                    <ErrorMessage name={'email'}/>
                                    </div>
                                    <div>
                                    <Input label='Password*' name='password' type='password'
                                           placeholder='Enter your password'/>
                                    <ErrorMessage name={'password'}/>
                                    </div>

                                    <Button extraClass={'mt-1'} text={'Login'} type={'submit'} variant={'primary'} wFull={true}/>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                    <Button onClick={googleSignHandler} text={'Sign in with Google'} type={'button'} variant={'secondary'} wFull={true} isSocial={false} extraClass={'mt-4'}/>

                    <div className='flex mt-8'>
                    <p>Don’t have an account?</p>
                        <Button onClick={()=>navigate('/signup')} text={'Sign up'} type={'button'} variant={'link'} extraClass={'ml-1'}/>
                    </div>

                </div>
                <div className='hidden lg:flex justify-between items-center w-full'>
                    <p className='font-normal text-text-sm text-gray-600'>© Movies App</p>
                    <div className='flex gap-2'>
                        {/* <img src={mailIcon} alt="mailicon"/> */}
                        <p className='font-normal text-text-sm text-gray-600'>yyunus.earslan@gmail.com</p>

                    </div>
                </div>
            </div>
            <div className='hidden lg:block lg:w-1/2 bg-signup bg-cover bg-center'>
            </div>
        </div>

    );
}
