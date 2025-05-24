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
  Divider,
  Transition,
  rem,
} from "@mantine/core";
import {
  IconLogout,
  IconUser,
  IconFileText,
  IconCloudUpload,
} from "@tabler/icons-react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Box
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #64b5f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Container size={480} px="xs">
        <Transition transition="slide-up" duration={600} mounted={true}>
          {(styles) => (
            <Paper
              shadow="xl"
              radius="xl"
              p="xl"
              style={{
                ...styles,
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.97) 70%, #e3f2fd 100%)",
                border: "2px solid #90caf9",
                boxShadow: "0 8px 32px 0 rgba(30,60,114,0.15)",
              }}
            >
              <Group position="apart" mb="md">
                <Title
                  order={2}
                  style={{
                    fontWeight: 800,
                    color: "#1e3c72",
                    letterSpacing: rem(1),
                  }}
                >
                  Welcome, {user?.username || "User"}!
                </Title>
                <Button
                  variant="gradient"
                  gradient={{ from: "red", to: "orange", deg: 90 }}
                  leftSection={<IconLogout size={18} />}
                  onClick={logout}
                  size="md"
                  radius="xl"
                  style={{ fontWeight: 600 }}
                >
                  Logout
                </Button>
              </Group>
              <Group position="center" mb="md">
                <Avatar
                  size={100}
                  radius="xl"
                  style={{
                    border: "4px solid #1976d2",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)",
                    boxShadow: "0 4px 16px 0 rgba(30,60,114,0.10)",
                  }}
                >
                  <IconUser size={56} color="#fff" />
                </Avatar>
              </Group>
              <Text
                align="center"
                size="xl"
                fw={700}
                color="#1e3c72"
                mb={4}
                style={{ letterSpacing: rem(0.5) }}
              >
                {user?.username || "No username"}
              </Text>
              <Text align="center" size="md" color="dimmed" mb="xs">
                {user?.email || "No email"}
              </Text>
              <Divider my="lg" color="#90caf9" />
              <Group position="center" spacing="xl" mb="md">
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconFileText size={36} color="#1976d2" />
                  <Text size="sm" color="#1976d2" mt={4}>
                    View Documents
                  </Text>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <IconCloudUpload size={36} color="#1976d2" />
                  <Text size="sm" color="#1976d2" mt={4}>
                    Upload New
                  </Text>
                </Box>
              </Group>
              <Text
                align="center"
                mt="lg"
                color="blue"
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: rem(18),
                  textShadow: "0 2px 8px #e3f2fd",
                }}
              >
                You can now upload and interact with your documents using AI!
              </Text>
            </Paper>
          )}
        </Transition>
      </Container>
    </Box>
  );
};

export default Dashboard;
