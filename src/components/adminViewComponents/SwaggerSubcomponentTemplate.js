import SwaggerUI from "swagger-ui-react";
import SwaggerContentContainer from "../SwaggerContentContainer";
import React, {Component} from "react";
import SwaggerContainer from "./subComponents/SwaggerContainer";

class SwaggerSubcomponentTemplate extends Component {

    render() {

        return <SwaggerContentContainer>
            <SwaggerContainer>
                <SwaggerUI spec={this.props.swaggerSpec}/>
            </SwaggerContainer>
        </SwaggerContentContainer>
    }

}
export default SwaggerSubcomponentTemplate;