import {createRouter} from 'vanilla-ui-router';
import $ from 'jquery'


let router

 $(document).ready(() => {
   router = createRouter(document.getElementById('app'));

    router

        // Start route: The server side URL without a hash
        .addRoute('', () => {
            /*
                Use navigateTo(…) to make dynamic route changes, i.e. to redirect to another route
            */
            router.navigateTo('home');
        })

        .addRoute('home', (domEntryPoint) => {
            domEntryPoint.textContent = "You are in home page";
        })
        .otherwise(() => {
            // If no route configuration matches, the otherwise route is invoked.
            console.log('I am the otherwise route');
            router.navigateTo('404');
        });
});


let getRouter = () => { return router }

export default getRouter
