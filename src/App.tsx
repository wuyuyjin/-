import {Box} from "@chakra-ui/react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Outlet} from "react-router-dom";

const App = () => {
    // 引入动画效果OutoAnimate
    const [animationParent] = useAutoAnimate()
    return (
        <Box ref={animationParent} className="md:2xl bg-slate-100"
             w="100%"
             h="100vh"
             position="absolute"
             zIndex="-1"
        >
            {/*用来渲染子路由的，相当于vue-router的router view，必须要有的*/}
            <Outlet />
        </Box>
    )
}

export default App
