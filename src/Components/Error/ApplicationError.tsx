import * as React from "react";
import { Layout } from "Components/Layout/Layout";
import { Typography, Button } from "@material-ui/core";
import NotInterestedIcon from "@material-ui/icons/Error";
import ErrorIcon from "@material-ui/icons/Home";
import { useResource, Resources } from "Translations/Resources";
import styled from "styled-components";

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

const ApplicationError: React.FunctionComponent = _ => {
  const { t } = useResource();

  const refresh = () => {
    window.location.href = "/";
  };

  return (
    <Layout>
      <StyledPage>
        <Typography variant="h1">
          {t(Resources.Errors.ApplicationError.Title)}
        </Typography>
        <Typography variant="h2">
          {t(Resources.Errors.ApplicationError.Subtitle)}
        </Typography>
        <StyledIcon />
        <Button
          startIcon={<ErrorIcon />}
          size="large"
          variant="contained"
          color="primary"
          onClick={refresh}
        >
          {t(Resources.Errors.ApplicationError.Home)}
        </Button>
      </StyledPage>
    </Layout>
  );
};

export { ApplicationError };
