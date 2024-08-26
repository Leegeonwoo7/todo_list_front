import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch 대신 Routes 사용
import { Box, Typography } from "@mui/material";
import React from "react";
import Login from "./Login";
import App from "./App";
import SignUp from "./SignUp";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/signup">
                                <SignUp />
                            </Route>
                            <Route path="/">
                                <App />
                            </Route>
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;

// render() {
//     return (
//         <Router>
//             <div>
//                 <Routes> {/* Switch 대신 Routes 사용 */}
//                     <Route path="/login" element={<Login />} /> {/* element prop 사용 */}
//                     <Route path="/" element={<App />} /> {/* element prop 사용 */}
//                 </Routes>
//                 <Box mt={5}>
//                     <Copyright />
//                 </Box>
//             </div>
//         </Router>
//     );
// }