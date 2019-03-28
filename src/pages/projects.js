import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import ProjectBox from "../components/projectBox";
import Layout from "../components/layout";

export default ({ data }) => {
  return (
    <Layout>
      <Container>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const img = data.allImageSharp.edges.find(img =>
            img.node.fluid.src.includes(`${node.frontmatter.title}.jpg`)
          );
          return (
            <ProjectBox
              project={node}
              key={node.frontmatter.title}
              linkTo={`projects/${node.frontmatter.title}`}
              fluid={img && img.node.fluid}
            />
          );
        })}
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28vw, 28vw));
  grid-gap: 5px;
  justify-content: center;
  margin: 20px;
  @media (max-width: 1386px) {
    grid-template-columns: repeat(auto-fill, minmax( 40vw, 40vw));
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fill, minmax( 85vw, 85vw));
  }
`;

export const query = graphql`
  query {
    allImageSharp(filter: { fluid: { src: { regex: "/project/" } } }) {
      edges {
        node {
          id
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }

    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/project/" } } }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            name
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;