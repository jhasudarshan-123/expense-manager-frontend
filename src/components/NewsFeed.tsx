
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NewsFeed = () => {
  const newsItems = [
    {
      title: "Latest Research on Diabetes Management",
      summary: "New findings show promising results for blood sugar control through innovative treatment approaches.",
      time: "2 hours ago",
      category: "Research"
    },
    {
      title: "Heart Health: Prevention Tips",
      summary: "Experts share simple lifestyle changes that can significantly reduce cardiovascular risk factors.",
      time: "4 hours ago",
      category: "Wellness"
    },
    {
      title: "Mental Health Awareness Week",
      summary: "Join our community events focusing on mental wellness and support networks.",
      time: "1 day ago",
      category: "Community"
    },
    {
      title: "Nutrition Guidelines Updated",
      summary: "New dietary recommendations for chronic disease management and prevention.",
      time: "2 days ago",
      category: "Nutrition"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Research':
        return 'bg-blue-100 text-blue-800';
      case 'Wellness':
        return 'bg-green-100 text-green-800';
      case 'Community':
        return 'bg-purple-100 text-purple-800';
      case 'Nutrition':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          📰 Latest News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {newsItems.map((item, index) => (
          <div key={index} className="group">
            <div className="pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <Badge 
                  variant="secondary" 
                  className={`text-xs font-medium ${getCategoryColor(item.category)}`}
                >
                  {item.category}
                </Badge>
                <span className="text-xs text-gray-500 font-medium">{item.time}</span>
              </div>
              <h4 className="font-semibold text-sm text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.summary}
              </p>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View all news →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsFeed;
