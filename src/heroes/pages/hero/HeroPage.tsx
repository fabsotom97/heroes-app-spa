import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroPageStatsCard } from "@/heroes/components/HeroPageStatsCard";
import { HeroPowerComparisonChart } from "@/heroes/components/HeroPowerComparisonChart";
import { useHero } from "@/heroes/hooks/useHero";
import type { HeroCategory, HeroStatus } from "@/heroes/models/hero.interface";
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react"
import { Navigate, useParams } from "react-router";


export const HeroPage = () => {

  const { slug = '' } = useParams();

  const { data: heroResponse, isLoading, isError, } = useHero(slug);

  if (isError) {
    return <Navigate to='/' />;
  }

  if (isLoading) {
    return (<h3>Loading...</h3>);
  }

  if (!heroResponse) {
    return <Navigate to='/' />
  }

  const totalPower = heroResponse.strength + heroResponse.intelligence
    + heroResponse.speed + heroResponse.durability;

  const averagePower = Math.round((totalPower / 4) * 10)

  const getStatusColor = (status: HeroStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      default:
        return "bg-gray-500";
    }
  }

  const getCategoryColor = (category: HeroCategory) => {
    switch (category) {
      case 'Hero':
        return 'bg-blue-500';
      case 'Villain':
        return 'bg-red-500';
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={heroResponse.image || "/placeholder.svg"}
                alt={heroResponse.alias}
                width={200}
                height={200}
                className="rounded-full border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-400 text-black rounded-full p-2">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className={`${getCategoryColor(heroResponse.category)} text-white`}>
                  {heroResponse.category}
                </Badge>
                <Badge className={`${getStatusColor(heroResponse.status)} text-white`}>{heroResponse.status}</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {heroResponse.universe}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-2">{heroResponse.alias}</h1>
              <p className="text-xl text-blue-200 mb-4">{heroResponse.name}</p>
              <p className="text-lg text-gray-300 max-w-2xl">{heroResponse.description}</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400">{averagePower}%</div>
                <div className="text-sm text-gray-300">Nivel de Poder</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(averagePower / 20) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="powers" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Powers
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strength */}
              <HeroPageStatsCard
                color="red"
                icon={<Zap className="w-8 h-8 text-red-600" />}
                label="Strength"
                value={heroResponse.strength}
              />

              {/* Intelligence */}
              <HeroPageStatsCard
                color="purple"
                icon={<Brain className="w-8 h-8 text-purple-600" />}
                label="Intelligence"
                value={heroResponse.intelligence}
              />

              {/* Speed */}
              <HeroPageStatsCard
                color="yellow"
                colorWeight={400}
                icon={<Gauge className="w-8 h-8 text-yellow-600" />}
                label="Speed"
                value={heroResponse.speed}
              />

              {/* Durability */}
              <HeroPageStatsCard
                color="green"
                icon={<Shield className="w-8 h-8 text-green-600" />}
                label="Durability"
                value={heroResponse.durability}
              />
            </div>

            {/* Power Comparison Chart */}
            <HeroPowerComparisonChart hero={heroResponse} />

          </TabsContent>

          <TabsContent value="powers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroResponse.powers.map((power, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-full">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-blue-900">{power}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-500" />
                  Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{heroResponse.team}</h3>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Real name:</span>
                    <span className="font-semibold">{heroResponse.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Alias:</span>
                    <span className="font-semibold">{heroResponse.alias}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Category:</span>
                    <Badge className={`${getCategoryColor(heroResponse.category)} text-white`}>
                      {heroResponse.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={`${getStatusColor(heroResponse.status)} text-white`}>
                      {heroResponse.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Universe information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Universe:</span>
                    <span className="font-semibold">{heroResponse.universe}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">First appearance:</span>
                    <span className="font-semibold">{heroResponse.firstAppearance}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Active years:</span>
                    <span className="font-semibold">
                      {new Date().getFullYear() - Number.parseInt(heroResponse.firstAppearance)} years
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}