import * as React from "react";
import { Layout } from "Components/Layout/Layout";
import { Typography, Button } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import HomeIcon from "@material-ui/icons/Home";
import { useResource, Resources } from "Translations/Resources";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UnstyledLink } from "Components/Routes/UnstyledLink";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledIcon = styled(NotInterestedIcon)`
  margin: 20px;
  font-size: 120px;
`;

const Error404Page: React.FunctionComponent = _ => {
  const { t } = useResource();
  const location = useLocation();

  return (
    <Layout>
      <StyledPage>
        <Typography variant="h1">Error404</Typography>
        <Typography variant="h2">{location.pathname}</Typography>
        <Typography variant="h2">
          {t(Resources.Errors.Error404.Subtitle)}
        </Typography>
        <StyledIcon />
        <UnstyledLink to="/">
          <Button
            startIcon={<HomeIcon />}
            size="large"
            variant="contained"
            color="primary"
          >
            {t(Resources.Errors.Error404.Home)}
          </Button>
        </UnstyledLink>
      </StyledPage>
    </Layout>
  );
};

export { Error404Page };
