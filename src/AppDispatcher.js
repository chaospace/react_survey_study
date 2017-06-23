import {Dispatcher} from "flux";

class AppDispatcher extends Dispatcher {

	dispatchAsync( promise, types, data ){

		const {request, success, failure } = types;
		this.dispatch({
			type: request,
			data: Object.assign({}, data )
		});

		promise.then( (response) =>{
				this.dispatch({
					type: success,
					data: response
				});
			}
			,
			(error) =>{
				this.dispatch({
   				 	type:failure,
   				 	data: error
   				});
			}

		);

	}

}

export default new AppDispatcher();
