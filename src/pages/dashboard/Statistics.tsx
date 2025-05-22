
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

// Données fictives pour les statistiques
const studentsByLevel = [
  { name: "Licence 1", value: 150, color: "#0ea5e9" },
  { name: "Licence 2", value: 120, color: "#8b5cf6" },
  { name: "Licence 3", value: 90, color: "#10b981" },
  { name: "Master 1", value: 60, color: "#f59e0b" },
  { name: "Master 2", value: 40, color: "#ef4444" },
];

const studentsByFiliere = [
  { name: "Informatique", value: 180, color: "#0ea5e9" },
  { name: "Gestion", value: 150, color: "#8b5cf6" },
  { name: "Droit", value: 80, color: "#10b981" },
  { name: "Communication", value: 50, color: "#f59e0b" },
];

const studentsByOption = [
  { name: "Développement", filiere: "Informatique", value: 100 },
  { name: "Réseaux", filiere: "Informatique", value: 80 },
  { name: "Marketing", filiere: "Gestion", value: 70 },
  { name: "Finance", filiere: "Gestion", value: 80 },
  { name: "Droit Pénal", filiere: "Droit", value: 40 },
  { name: "Droit Civil", filiere: "Droit", value: 40 },
  { name: "Médias", filiere: "Communication", value: 30 },
  { name: "RP", filiere: "Communication", value: 20 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 rounded-md border shadow-sm">
        <p className="font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="text-sm text-muted-foreground">{`${Math.round(payload[0].percent * 100)}%`}</p>
      </div>
    );
  }
  return null;
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 rounded-md border shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const StatisticsCard = ({ title, description, children }: any) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="h-[400px]">
      {children}
    </CardContent>
  </Card>
);

const DashboardStatistics = () => {
  const totalStudents = studentsByLevel.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground mt-2">
          Visualiser les statistiques détaillées des étudiants par niveau, filière et option.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalStudents}</div>
            <p className="text-sm text-muted-foreground mt-1">Actuellement inscrits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Filières</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{studentsByFiliere.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Filières disponibles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{studentsByOption.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Spécialités proposées</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="by-level" className="w-full">
        <TabsList className="grid w-full sm:w-[500px] grid-cols-3">
          <TabsTrigger value="by-level">Par Niveau</TabsTrigger>
          <TabsTrigger value="by-filiere">Par Filière</TabsTrigger>
          <TabsTrigger value="by-option">Par Option</TabsTrigger>
        </TabsList>

        <TabsContent value="by-level" className="mt-6">
          <StatisticsCard
            title="Étudiants par Niveau"
            description={`Répartition des ${totalStudents} étudiants par niveau d'études`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentsByLevel}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {studentsByLevel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </StatisticsCard>
        </TabsContent>

        <TabsContent value="by-filiere" className="mt-6">
          <StatisticsCard
            title="Étudiants par Filière"
            description={`Répartition des ${totalStudents} étudiants par filière d'études`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentsByFiliere}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {studentsByFiliere.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </StatisticsCard>
        </TabsContent>

        <TabsContent value="by-option" className="mt-6">
          <StatisticsCard
            title="Étudiants par Option"
            description="Répartition des étudiants par option de spécialisation"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentsByOption}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip content={<BarTooltip />} />
                <Legend />
                <Bar dataKey="value" name="Étudiants" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </StatisticsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardStatistics;
