
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend 
} from "recharts";

// Mock data - in a real app, this would come from an API call
const studentsByLevel = [
  { name: 'Licence 1', value: 120 },
  { name: 'Licence 2', value: 100 },
  { name: 'Licence 3', value: 80 },
  { name: 'Master 1', value: 40 },
  { name: 'Master 2', value: 30 },
  { name: 'Doctorat', value: 15 },
];

const studentsByGender = [
  { name: 'Hommes', value: 220, color: '#3182ce' },
  { name: 'Femmes', value: 165, color: '#ed64a6' },
];

const studentsByDepartment = [
  { name: 'Informatique', count: 85 },
  { name: 'Gestion', count: 65 },
  { name: 'Droit', count: 60 },
  { name: 'Médecine', count: 45 },
  { name: 'Économie', count: 70 },
  { name: 'Communication', count: 60 },
];

const StatisticsOverview = () => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Étudiants par Niveau</CardTitle>
          <CardDescription>Répartition des étudiants par niveau d'étude</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={studentsByLevel}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} étudiants`, 'Effectif']}
                  labelFormatter={(label) => `Niveau: ${label}`}
                />
                <Bar 
                  dataKey="value" 
                  name="Étudiants" 
                  fill="#4299E1" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Répartition par Genre</CardTitle>
          <CardDescription>Distribution des étudiants par genre</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentsByGender}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, value, percent}) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                >
                  {studentsByGender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} étudiants`, 'Effectif']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md md:col-span-2">
        <CardHeader>
          <CardTitle>Étudiants par Filière</CardTitle>
          <CardDescription>Distribution des étudiants par filière d'étude</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={studentsByDepartment}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                layout="vertical"
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value) => [`${value} étudiants`, 'Effectif']}
                  labelFormatter={(label) => `Filière: ${label}`}
                />
                <Bar 
                  dataKey="count" 
                  name="Étudiants" 
                  fill="#2A4365" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsOverview;
