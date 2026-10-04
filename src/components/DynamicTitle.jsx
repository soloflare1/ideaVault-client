import { Helmet } from "react-helmet-async";

const DynamicTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | IdeaVault - Startup Validation</title>
    </Helmet>
  );
};

export default DynamicTitle;