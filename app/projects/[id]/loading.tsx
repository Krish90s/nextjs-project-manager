import { Heading, Flex, Card, Text, Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import React from "react";

const LoadingProjectsDetails = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card>
        <Text>
          <Skeleton count={3} />
        </Text>
      </Card>
    </Box>
  );
};

export default LoadingProjectsDetails;
