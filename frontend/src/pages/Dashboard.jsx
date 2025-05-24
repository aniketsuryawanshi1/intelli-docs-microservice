import React from "react";
import {
  Button,
  Group,
  Text,
  Avatar,
  Container,
  Title,
  Paper,
  Box,
} from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons-react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container size="sm">
        <Paper
          shadow="xl"
          radius="lg"
          p="xl"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.95) 60%, #e3f2fd 100%)",
            border: "1px solid #90caf9",
          }}
        >
          <Group position="apart" mb="md">
            <Title order={2} color="#1e3c72" style={{ fontWeight: 700 }}>
              Welcome, {user?.username || "User"}!
            </Title>
            <Button
              variant="gradient"
              gradient={{ from: "red", to: "orange", deg: 90 }}
              leftIcon={<IconLogout size={18} />}
              onClick={logout}
            >
              Logout
            </Button>
          </Group>
          <Group position="center" mb="md">
            <Avatar
              size={90}
              radius="xl"
              color="blue"
              style={{
                border: "3px solid #1976d2",
                background: "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
              }}
            >
              <IconUser size={48} color="#fff" />
            </Avatar>
          </Group>
          <Text align="center" size="xl" weight={600} color="#1e3c72" mb={4}>
            {user?.username || "No username"}
          </Text>
          <Text align="center" size="md" color="dimmed">
            {user?.email || "No email"}
          </Text>
          <Text
            align="center"
            mt="lg"
            color="blue"
            style={{ fontStyle: "italic" }}
          >
            You can now upload and interact with your documents using AI!
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
