import { Blocks } from "react-loader-spinner";
import React from "react";
import Layout from "./Layout";

const Loading = () => {
  return (
    <Layout>
      <div className="h-screen flex justify-center">
        <Blocks
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    </Layout>
  );
};

export default Loading;
