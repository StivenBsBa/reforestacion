import {
  AutoGraphOutlined,
  ForestOutlined,
  FolderOutlined,
  GroupsOutlined,
  ParkOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const plannedFeatures = [
  {
    title: "Comunidades",
    description:
      "Organización de las comunidades que lideran y participan en cada iniciativa.",
    icon: <GroupsOutlined fontSize="large" />,
  },
  {
    title: "Proyectos",
    description:
      "Consulta estructurada de proyectos, objetivos y actividades de reforestación.",
    icon: <FolderOutlined fontSize="large" />,
  },
  {
    title: "Seguimiento de siembras",
    description:
      "Documentación del desarrollo de las siembras y de los árboles plantados.",
    icon: <ParkOutlined fontSize="large" />,
  },
  {
    title: "Registro de avances",
    description:
      "Historial claro de actividades y progreso para facilitar el seguimiento.",
    icon: <AutoGraphOutlined fontSize="large" />,
  },
];

export default function Home() {
  return (
    <Box component="main">
      <AppBar
        component="header"
        position="static"
        elevation={0}
        sx={{ bgcolor: "#0B1929", borderBottom: "1px solid #24364a" }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
            <Stack
              direction="row"
              spacing={1.25}
              sx={{ flexGrow: 1, alignItems: "center" }}
            >
              <Box
                aria-hidden="true"
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: "#FFCC35",
                  color: "#0B1929",
                }}
              >
                <ForestOutlined />
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: "common.white",
                    fontWeight: 750,
                    lineHeight: 1.1,
                  }}
                >
                  Reforestación Comunitaria
                </Typography>
                <Typography
                  component="p"
                  variant="caption"
                  color="rgba(255,255,255,0.68)"
                >
                  Nombre provisional
                </Typography>
              </Box>
            </Stack>

            <Stack
              component="nav"
              aria-label="Navegación principal"
              direction="row"
              spacing={{ xs: 2, sm: 3 }}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Link color="common.white" href="#objetivo" underline="hover">
                Objetivo
              </Link>
              <Link color="common.white" href="#funcionalidades" underline="hover">
                Funcionalidades
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "#0B1929",
          color: "common.white",
          py: { xs: 8, sm: 10, md: 13 },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: { xs: -140, md: -220 },
            right: { xs: -180, md: -100 },
            width: { xs: 340, md: 520 },
            height: { xs: 340, md: 520 },
            border: "72px solid rgba(18, 91, 206, 0.24)",
            borderRadius: "50%",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Box sx={{ maxWidth: 850 }}>
            <Chip
              label="Proyecto en desarrollo · v0.1.0"
              sx={{
                mb: 3,
                bgcolor: "#FFCC35",
                color: "#0B1929",
                fontWeight: 750,
              }}
            />
            <Typography
              component="h1"
              variant="h1"
              sx={{
                maxWidth: 800,
                fontSize: { xs: "2.45rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 780,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
            >
              Plataforma de Seguimiento de Reforestación Comunitaria
            </Typography>
            <Typography
              sx={{
                mt: 3,
                maxWidth: 720,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1.05rem", sm: "1.2rem" },
                lineHeight: 1.75,
              }}
            >
              Una plataforma digital diseñada para registrar, organizar y
              visualizar el avance de iniciativas de reforestación desarrolladas
              por diferentes comunidades.
            </Typography>
            <Typography
              sx={{
                mt: 2,
                maxWidth: 720,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1.05rem", sm: "1.2rem" },
                lineHeight: 1.75,
              }}
            >
              Permitirá consultar proyectos, conocer las actividades realizadas,
              documentar el progreso de las siembras y facilitar el seguimiento
              de los árboles plantados.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        id="objetivo"
        component="section"
        sx={{ bgcolor: "background.default", py: { xs: 8, md: 11 } }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "0.7fr 1.3fr" },
              gap: { xs: 3, md: 8 },
              alignItems: "start",
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box sx={{ width: 40, height: 3, bgcolor: "secondary.main" }} />
              <Typography
                component="h2"
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                }}
              >
                Objetivo del proyecto
              </Typography>
            </Stack>
            <Typography
              variant="h3"
              sx={{
                color: "#0B1929",
                fontSize: { xs: "1.8rem", sm: "2.35rem" },
                fontWeight: 700,
                lineHeight: 1.25,
              }}
            >
              Convertir el trabajo de campo en información organizada y útil
              para cada iniciativa.
            </Typography>
            <Box sx={{ display: { xs: "none", md: "block" } }} />
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              La plataforma ayudará a conservar una memoria clara de las
              actividades, centralizar la información de los proyectos y dar
              continuidad al seguimiento de las siembras. Esta primera versión
              establece la base técnica para construir esas capacidades de forma
              gradual y mantenible.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        id="funcionalidades"
        component="section"
        sx={{ bgcolor: "#EEF3F9", py: { xs: 8, md: 11 } }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            sx={{
              color: "#0B1929",
              fontSize: { xs: "2rem", sm: "2.6rem" },
              fontWeight: 750,
              letterSpacing: "-0.02em",
            }}
          >
            Funcionalidades previstas
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 680 }}>
            Capacidades contempladas para próximas etapas. Aún no se encuentran
            habilitadas en la versión actual.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2.5,
              mt: 5,
            }}
          >
            {plannedFeatures.map((feature) => (
              <Card
                key={feature.title}
                variant="outlined"
                sx={{
                  height: "100%",
                  borderColor: "rgba(11, 25, 41, 0.09)",
                  boxShadow: "0 12px 32px rgba(11, 25, 41, 0.06)",
                }}
              >
                <CardContent sx={{ p: 3.25, "&:last-child": { pb: 3.25 } }}>
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 52,
                      height: 52,
                      mb: 3,
                      borderRadius: 2.5,
                      bgcolor: "rgba(18, 91, 206, 0.1)",
                      color: "primary.main",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{ fontWeight: 750 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: "#0B1929", color: "common.white" }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1,
              py: 3.5,
            }}
          >
            <Typography sx={{ fontWeight: 650 }}>
              Reforestación Comunitaria
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.64)">
              Proyecto en desarrollo · 2026
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
