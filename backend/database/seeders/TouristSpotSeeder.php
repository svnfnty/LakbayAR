<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TouristSpot;
use App\Models\Visit;

class TouristSpotSeeder extends Seeder
{
    public function run(): void
    {
        $spots = [
            [
                'name' => 'Gumasa White Beach',
                'slug' => 'gumasa-white-beach',
                'description' => 'A pristine white sand beach with crystal clear waters, perfect for swimming and relaxation. Features coconut trees lining the shore and stunning sunset views.',
                'history_content' => 'Originally a hidden gem known only to locals, Gumasa Beach has become one of Gingoog\'s most visited coastal destinations. The name "Gumasa" comes from the local word "masa" meaning mass, as the area historically served as a gathering place for coastal communities. Fishermen once used this beach as a staging area for their daily catch, and remnants of old fishing structures can still be found along the shoreline. Today, the beach has been developed as a tourism destination while preserving its natural beauty and cultural significance to the local Gingoog community.',
                'latitude' => 8.8250,
                'longitude' => 125.0950,
                'category' => 'Beach/Nature',
                'thumbnail_image' => '/images/spots/gumasa-beach.jpg',
                'marker_image' => '/markers/gumasa-beach-marker.patt',
                'points_reward' => 15,
            ],
            [
                'name' => 'Mount Balatukan Range Natural Park',
                'slug' => 'mount-balatukan-range',
                'description' => 'A protected natural park featuring diverse flora and fauna, cold springs, and challenging hiking trails. Home to the endangered Philippine eagle and unique mossy forests.',
                'history_content' => 'Declared a protected area in 2007, Mount Balatukan stands at 2,450 meters above sea level. The name originates from "balatok" meaning high peak in the local dialect. Indigenous groups consider this mountain sacred and conduct rituals here during planting and harvest seasons. The mountain range serves as a watershed for several rivers that supply water to Gingoog City and surrounding municipalities. Scientists have documented over 200 species of birds and 150 species of plants within the park boundaries, making it one of the most biodiverse areas in Northern Mindanao.',
                'latitude' => 8.7800,
                'longitude' => 125.0500,
                'category' => 'Mountain/Adventure',
                'thumbnail_image' => '/images/spots/mt-balatukan.jpg',
                'marker_image' => '/markers/mt-balatukan-marker.patt',
                'points_reward' => 20,
            ],
            [
                'name' => 'Gingoog City Plaza',
                'slug' => 'gingoog-city-plaza',
                'description' => 'The heart of Gingoog City, a historic public square surrounded by heritage structures, government buildings, and lush gardens. A gathering place for locals and visitors alike.',
                'history_content' => 'The Gingoog City Plaza has been the center of civic life since the Spanish colonial era. Originally established as a pueblo plaza in the 1800s, it has witnessed the evolution of the city from a small fishing village to a thriving urban center. The plaza\'s gazebo has hosted countless cultural performances, political rallies, and community celebrations. The surrounding architecture reflects multiple colonial influences — Spanish, American, and Japanese. During World War II, the plaza served as a strategic point for resistance fighters. Today it remains a beloved landmark where residents gather for daily conversations, weekend markets, and annual fiesta celebrations.',
                'latitude' => 8.8222,
                'longitude' => 125.0985,
                'category' => 'Historical/Cultural',
                'thumbnail_image' => '/images/spots/city-plaza.jpg',
                'marker_image' => '/markers/city-plaza-marker.patt',
                'points_reward' => 10,
            ],
            [
                'name' => 'Calaitan Cave',
                'slug' => 'calaitan-cave',
                'description' => 'A limestone cave system featuring impressive stalactites and stalagmites, underground rivers, and ancient rock formations spanning millions of years.',
                'history_content' => 'Calaitan Cave is one of the most significant geological formations in Misamis Oriental. The cave system extends for several kilometers underground and was first explored by local spelunkers in the 1990s. Archaeological surveys have revealed artifacts suggesting the cave was used as a shelter by pre-colonial inhabitants. The name "Calaitan" is derived from the Visayan word meaning "connected passages," referring to the cave\'s interconnected chambers. Local legends tell of hidden Japanese treasure buried within the deeper chambers during World War II, though no such treasure has been found.',
                'latitude' => 8.8100,
                'longitude' => 125.1100,
                'category' => 'Nature/Adventure',
                'thumbnail_image' => '/images/spots/calaitan-cave.jpg',
                'marker_image' => '/markers/calaitan-cave-marker.patt',
                'points_reward' => 15,
            ],
            [
                'name' => 'Odiongan Falls',
                'slug' => 'odiongan-falls',
                'description' => 'A spectacular multi-tiered waterfall cascading through lush tropical forest. The cold, refreshing waters create natural pools perfect for swimming.',
                'history_content' => 'Odiongan Falls is named after the barangay where it is located. The falls are fed by springs from the Balatukan mountain range, ensuring year-round water flow. Indigenous Higaonon tribes have long considered the falls a sacred site for cleansing rituals. The surrounding forest is home to diverse wildlife including monitor lizards, hornbills, and various species of butterflies. Local conservation efforts have maintained the pristine quality of the water and surrounding ecosystem. The trail to the falls passes through a 2-kilometer forest path that offers visitors a chance to experience the biodiversity of the Northern Mindanao region.',
                'latitude' => 8.8050,
                'longitude' => 125.0800,
                'category' => 'Nature/Waterfall',
                'thumbnail_image' => '/images/spots/odiongan-falls.jpg',
                'marker_image' => '/markers/odiongan-falls-marker.patt',
                'points_reward' => 15,
            ],
            [
                'name' => 'San Nicolas de Tolentino Cathedral',
                'slug' => 'san-nicolas-cathedral',
                'description' => 'The main Catholic church of Gingoog City, an architectural landmark featuring Spanish colonial design elements and beautiful stained glass windows.',
                'history_content' => 'The San Nicolas de Tolentino Cathedral is the seat of the Diocese of Gingoog. The original church was built by Spanish Augustinian missionaries in the early 1800s, though the current structure has been rebuilt and renovated multiple times due to damage from typhoons and earthquakes. The church\'s patron saint, San Nicolas de Tolentino, is celebrated annually in September with a week-long fiesta featuring processions, cultural shows, and traditional games. The cathedral houses several religious artifacts dating back to the Spanish period, including a centuries-old wooden crucifix and antique bells that still ring today.',
                'latitude' => 8.8215,
                'longitude' => 125.0990,
                'category' => 'Historical/Religious',
                'thumbnail_image' => '/images/spots/cathedral.jpg',
                'marker_image' => '/markers/cathedral-marker.patt',
                'points_reward' => 10,
            ],
        ];

        foreach ($spots as $spot) {
            TouristSpot::create($spot);
        }

        // Seed fake leaderboard data
        $this->seedLeaderboard();
    }

    private function seedLeaderboard(): void
    {
        $spots = TouristSpot::all();

        // Create 8 fake users with random visits
        for ($userId = 1; $userId <= 8; $userId++) {
            $numVisits = rand(2, 5);
            $visitedSpots = $spots->random(min($numVisits, $spots->count()));

            foreach ($visitedSpots as $spot) {
                Visit::create([
                    'user_id' => $userId,
                    'tourist_spot_id' => $spot->id,
                    'visited_at' => now()->subDays(rand(1, 30)),
                    'points_earned' => $spot->points_reward,
                ]);
            }
        }
    }
}
