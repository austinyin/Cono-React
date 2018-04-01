import RelationHOC from "src/shared/HOC/RelationHOC";
import ScrollHOC from "src/shared/HOC/ScrollHOC";
import {compose,connect} from "redux";


export default compose(
    RelationHOC,
    ScrollHOC
)
