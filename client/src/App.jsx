import AuthProvider from "./provider/authProvider"
import Routes from "./routes/routes"

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
)

export default App
