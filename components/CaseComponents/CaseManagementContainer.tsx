import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import EditCaseModal from "./Modals/EditCaseModal";
import { CenterFocusStrong } from "@material-ui/icons";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/

export const ManagementContainerQuery = `
query AllCategoriesQuery {
  category {
    id
    name
  }
}

`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <>
      <h5 className="title">Home Page</h5>
      <Navbar sticky = "top" color = "light"
      style={{
          display: "flex",
          justifyContent: "center",
          padding: "0.75rem",
          margin: "0.5rem"
        }}>
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Button variant="dark" onClick={() => "redirect"}>
          Delete Category
        </Button>
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
      </Navbar>
      <Grid container spacing={3}>
        {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */
        
        }
        {data
            ? data.category.map((category: any, index: number) => {
                return <Grid item xs={4} key = {index}>
                <CaseCategory category_id={category.id} />
                </Grid>
              })
            : "Something went wrong"}
        {/* END TODO */}
      </Grid>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />
    
    </>
  );
};
export default CaseManagementContainer;
