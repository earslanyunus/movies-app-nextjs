
import Navbar from './Navbar.js'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className='flex items-center justify-center py-4'>
        <a target='_blank' href='https://www.themoviedb.org/'><img className='w-20' alt='tmdb logo' src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'/></a> 
      </footer>
    </>
  )
}