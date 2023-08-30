import { Helmet } from "react-helmet";
import React from "react";

interface MetadataProps {
  title: string;
}

const Metadata = ({ title }: MetadataProps) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Metadata;
