
import {app} from './0_routes/app'

const port = 3000;

export const server = app.listen(port, () =>{
    console.log('This server is listening at port:' + port);
} );



