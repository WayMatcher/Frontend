import './App.scss'

import NavBar from './components/NavBar'
import MainPage from './components/MainPage'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <header className="App-Header">
        <NavBar />
      </header>
      <main className="App-Main">
        <MainPage />
        <aside>
          <LoginForm />
        </aside>
      </main>
      <footer className="App-Footer">
        <Footer />
      </footer>
    </>
  )
}