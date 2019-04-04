import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/layout";

const Links = ({ data }) => (
  <Layout>
    <Content>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Content>
  </Layout>
);

export default Links;

export const linksQuery = graphql`
  query linksQuery {
    markdownRemark(frontmatter: { title: { eq: "links" } }) {
      html
    }
  }
`;
const Content = styled.div`
  margin: 20px;
  @media (max-width: 800px) {
    margin: 0 10px;
  }
`;
