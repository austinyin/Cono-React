/**
 * ScrollHOC 和 RelationHOC的结合
 */
import RelationHOC from "src/shared/HOC/RelationHOC";
import ScrollHOC from "src/shared/HOC/ScrollHOC";
import {compose} from "redux";


export default compose(
    RelationHOC,
    ScrollHOC
)
