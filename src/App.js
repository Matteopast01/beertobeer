import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import Homepage from "./pages/Homepage.js";
import Search from "./pages/Search";
import OurPubs from "./pages/OurPubs";
import Login from "./pages/Login"
import {Signup} from "./pages/Signup"
import Profile from "./pages/Profile";
import { Provider } from 'react-redux';
import store from "./store/App";
import AdminPage from "./pages/AdminPage";
import {AdminPrivateRoute} from "./components/AdminPrivateRoute";
import SingleProductPage from "./pages/SingleProductPage";
import theme from "./style/palette";
import {ThemeProvider} from "@emotion/react";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={< Homepage />}/>
                        <Route element={<PrivateRoute />}>
                            <Route path="/profile" element={< Profile />}/>
                        </Route>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/signup" element={<Signup/>} />
                        <Route path="/search/:searchTerm?" element={<Search/>} />
                        <Route path="/ourpubs" element={<OurPubs/>} />
                        <Route path="/product/:beer_Id?" element={<SingleProductPage/>} />
                        <Route element={<AdminPrivateRoute />}>
                            <Route path="/adminPage" element={< AdminPage />}/>
                        </Route>
                        <Route path="*" element={<NotFound code = "404 Not Found" message="The requested page could not be found."/>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
