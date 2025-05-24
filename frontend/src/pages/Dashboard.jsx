import React from "react";
import {
  Button,
  Card,
  Group,
  Text,
  Avatar,
  Container,
  Title,
} from "@mantine/core";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container size="xs" mt={80}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="apart" mb="md">
          <Title order={3}>Dashboard</Title>
          <Button variant="outline" color="red" onClick={logout}>
            Logout
          </Button>
        </Group>
        <Group position="center" mb="md">
          <Avatar size={64} radius="xl">
            {user?.username
              ? user.username[0].toUpperCase()
              : user?.email?.[0]?.toUpperCase()}
          </Avatar>
        </Group>
        <Text align="center" size="lg" weight={500}>
          {user?.username || "No username"}
        </Text>
        <Text align="center" color="dimmed" size="sm">
          {user?.email}
        </Text>
      </Card>
    </Container>
  );
};

export default Dashboard;
