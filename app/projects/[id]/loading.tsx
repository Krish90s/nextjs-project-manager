import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const LoadingProjectsDetails = () => {
  return (
    <div>
      <Heading>
        <Skeleton />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton />
        <Text>
          <Skeleton />
        </Text>
      </Flex>
      <Card>
        <Text>
          <Skeleton />
        </Text>
      </Card>
    </div>
  );
};

export default LoadingProjectsDetails;
