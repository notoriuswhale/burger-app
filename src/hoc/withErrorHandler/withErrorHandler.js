import React, {Component} from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (RenderComponent, axios) => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: '',
                request: null,
                responce: null,
            };

        }

        componentWillMount() {
        //     Can't place this in constructor got an error on setState in constructor;
        //     placed interceptors in render.
            this.req = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.res = axios.interceptors.response.use(res => res,
                    error => {
            //     console.log('error');
                this.setState({error: error});
                return Promise.reject(error)
            });
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.res);
            axios.interceptors.request.eject(this.req);
        }

        errorConfirmedHandler = () =>{
            this.setState({
                error: null
            })
        }
        render() {
            // if(!this.res && !this.req){
            //
            // }

            let errorMessage = this.state.error ? this.state.error.message : null;
            return (
                <React.Fragment>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                        <p>{errorMessage}</p>
                    </Modal>
                    <RenderComponent {...this.props}/>
                </React.Fragment>
            );
        }
    }
};

export default withErrorHandler;