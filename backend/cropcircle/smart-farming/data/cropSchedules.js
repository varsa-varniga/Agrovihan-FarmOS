const cropSchedules = {
  Paddy: {
    crop_name: "Paddy",
    duration_weeks: 16,
    weekly_schedule: [
      {
        week: 1,
        tasks: [
          { task_name: "Land preparation and puddling", priority: 1, frequency: "once" },
          { task_name: "Nursery bed preparation", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 2,
        tasks: [
          { task_name: "Sow nursery seeds", priority: 1, frequency: "once" },
          { task_name: "Maintain shallow irrigation in nursery", priority: 2, frequency: "daily" },
        ],
      },
      {
        week: 3,
        tasks: [
          { task_name: "Main field leveling", priority: 1, frequency: "once" },
          { task_name: "Basal fertilization (NPK)", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 4,
        tasks: [
          { task_name: "Transplant seedlings", priority: 1, frequency: "once" },
          { task_name: "Irrigation after transplanting", priority: 1, frequency: "daily" },
        ],
      },
      {
        week: 5,
        tasks: [
          { task_name: "First weeding", priority: 2, frequency: "once" },
          { task_name: "Top dressing (nitrogen)", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 6,
        tasks: [
          { task_name: "Pest monitoring and control", priority: 2, frequency: "weekly" },
          { task_name: "Maintain field water level", priority: 2, frequency: "daily" },
        ],
      },
      {
        week: 7,
        tasks: [
          { task_name: "Second weeding", priority: 2, frequency: "once" },
          { task_name: "Fertilization (potash)", priority: 2, frequency: "once" },
        ],
      },
      {
        week: 8,
        tasks: [
          { task_name: "Irrigation management during tillering", priority: 2, frequency: "weekly" },
          { task_name: "Disease scouting", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 9,
        tasks: [
          { task_name: "Panicle initiation fertilizer", priority: 1, frequency: "once" },
          { task_name: "Insect control (stem borer)", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 10,
        tasks: [
          { task_name: "Irrigation at flowering", priority: 1, frequency: "daily" },
          { task_name: "Foliar micronutrients", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 11,
        tasks: [
          { task_name: "Bird and pest control", priority: 2, frequency: "weekly" },
          { task_name: "Drain excess water if needed", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 12,
        tasks: [
          { task_name: "Grain filling irrigation", priority: 2, frequency: "weekly" },
          { task_name: "Final disease check", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 13,
        tasks: [
          { task_name: "Reduce irrigation before harvest", priority: 2, frequency: "once" },
          { task_name: "Prepare harvesting tools", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 14,
        tasks: [
          { task_name: "Harvesting", priority: 1, frequency: "once" },
          { task_name: "Post-harvest drying", priority: 1, frequency: "daily" },
        ],
      },
      {
        week: 15,
        tasks: [
          { task_name: "Threshing and storage", priority: 1, frequency: "once" },
          { task_name: "Field cleanup", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 16,
        tasks: [
          { task_name: "Soil residue management", priority: 3, frequency: "once" },
          { task_name: "Plan next crop", priority: 3, frequency: "once" },
        ],
      },
    ],
  },
  Tomato: {
    crop_name: "Tomato",
    duration_weeks: 12,
    weekly_schedule: [
      {
        week: 1,
        tasks: [
          { task_name: "Land preparation and bed formation", priority: 1, frequency: "once" },
          { task_name: "Apply basal compost and fertilizer", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 2,
        tasks: [
          { task_name: "Transplant seedlings", priority: 1, frequency: "once" },
          { task_name: "Light irrigation", priority: 2, frequency: "daily" },
        ],
      },
      {
        week: 3,
        tasks: [
          { task_name: "Staking or trellising", priority: 2, frequency: "once" },
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 4,
        tasks: [
          { task_name: "Top dressing (nitrogen)", priority: 1, frequency: "once" },
          { task_name: "Pest scouting", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 5,
        tasks: [
          { task_name: "Irrigation management", priority: 2, frequency: "weekly" },
          { task_name: "Pruning suckers", priority: 3, frequency: "weekly" },
        ],
      },
      {
        week: 6,
        tasks: [
          { task_name: "Flowering stage nutrient spray", priority: 2, frequency: "once" },
          { task_name: "Disease control (blight)", priority: 1, frequency: "weekly" },
        ],
      },
      {
        week: 7,
        tasks: [
          { task_name: "Fruit set monitoring", priority: 2, frequency: "weekly" },
          { task_name: "Weeding and mulching", priority: 2, frequency: "once" },
        ],
      },
      {
        week: 8,
        tasks: [
          { task_name: "Potash application", priority: 1, frequency: "once" },
          { task_name: "Pest control (fruit borer)", priority: 1, frequency: "weekly" },
        ],
      },
      {
        week: 9,
        tasks: [
          { task_name: "Irrigation during fruiting", priority: 2, frequency: "weekly" },
          { task_name: "Remove diseased leaves", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 10,
        tasks: [
          { task_name: "Start harvesting (first pick)", priority: 1, frequency: "weekly" },
          { task_name: "Grade and pack fruits", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 11,
        tasks: [
          { task_name: "Continue harvesting", priority: 1, frequency: "weekly" },
          { task_name: "Monitor pests", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 12,
        tasks: [
          { task_name: "Final harvest", priority: 1, frequency: "once" },
          { task_name: "Field cleanup", priority: 3, frequency: "once" },
        ],
      },
    ],
  },
  Wheat: {
    crop_name: "Wheat",
    duration_weeks: 14,
    weekly_schedule: [
      {
        week: 1,
        tasks: [
          { task_name: "Land preparation and leveling", priority: 1, frequency: "once" },
          { task_name: "Basal fertilization", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 2,
        tasks: [
          { task_name: "Sowing", priority: 1, frequency: "once" },
          { task_name: "First irrigation", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 3,
        tasks: [
          { task_name: "Weeding (early stage)", priority: 2, frequency: "once" },
          { task_name: "Pest monitoring", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 4,
        tasks: [
          { task_name: "Top dressing (nitrogen)", priority: 1, frequency: "once" },
          { task_name: "Irrigation", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 5,
        tasks: [
          { task_name: "Weeding and interculture", priority: 2, frequency: "weekly" },
          { task_name: "Disease scouting", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 6,
        tasks: [
          { task_name: "Second irrigation", priority: 2, frequency: "weekly" },
          { task_name: "Nutrient spray if needed", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 7,
        tasks: [
          { task_name: "Pest control (aphids)", priority: 2, frequency: "weekly" },
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 8,
        tasks: [
          { task_name: "Irrigation at booting", priority: 1, frequency: "once" },
          { task_name: "Fertilization (potash)", priority: 2, frequency: "once" },
        ],
      },
      {
        week: 9,
        tasks: [
          { task_name: "Disease control (rust)", priority: 1, frequency: "weekly" },
          { task_name: "Irrigation at heading", priority: 2, frequency: "once" },
        ],
      },
      {
        week: 10,
        tasks: [
          { task_name: "Grain filling irrigation", priority: 2, frequency: "weekly" },
          { task_name: "Field monitoring", priority: 3, frequency: "weekly" },
        ],
      },
      {
        week: 11,
        tasks: [
          { task_name: "Reduce irrigation", priority: 2, frequency: "once" },
          { task_name: "Prepare harvest equipment", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 12,
        tasks: [
          { task_name: "Harvesting", priority: 1, frequency: "once" },
          { task_name: "Threshing", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 13,
        tasks: [
          { task_name: "Drying and storage", priority: 1, frequency: "daily" },
          { task_name: "Field cleanup", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 14,
        tasks: [
          { task_name: "Soil preparation for next crop", priority: 3, frequency: "once" },
          { task_name: "Record yields", priority: 3, frequency: "once" },
        ],
      },
    ],
  },
  Maize: {
    crop_name: "Maize",
    duration_weeks: 12,
    weekly_schedule: [
      {
        week: 1,
        tasks: [
          { task_name: "Land preparation", priority: 1, frequency: "once" },
          { task_name: "Apply basal fertilizer", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 2,
        tasks: [
          { task_name: "Sowing", priority: 1, frequency: "once" },
          { task_name: "Irrigation after sowing", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 3,
        tasks: [
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
          { task_name: "Pest scouting", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 4,
        tasks: [
          { task_name: "Top dressing (nitrogen)", priority: 1, frequency: "once" },
          { task_name: "Irrigation", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 5,
        tasks: [
          { task_name: "Earthing up", priority: 2, frequency: "once" },
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 6,
        tasks: [
          { task_name: "Pest control (stem borer)", priority: 2, frequency: "weekly" },
          { task_name: "Irrigation", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 7,
        tasks: [
          { task_name: "Fertilization (potash)", priority: 2, frequency: "once" },
          { task_name: "Disease monitoring", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 8,
        tasks: [
          { task_name: "Irrigation at tasseling", priority: 1, frequency: "once" },
          { task_name: "Pest monitoring", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 9,
        tasks: [
          { task_name: "Irrigation at silking", priority: 1, frequency: "once" },
          { task_name: "Weeding if needed", priority: 3, frequency: "once" },
        ],
      },
      {
        week: 10,
        tasks: [
          { task_name: "Grain filling irrigation", priority: 2, frequency: "weekly" },
          { task_name: "Disease control", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 11,
        tasks: [
          { task_name: "Prepare for harvest", priority: 3, frequency: "once" },
          { task_name: "Reduce irrigation", priority: 2, frequency: "once" },
        ],
      },
      {
        week: 12,
        tasks: [
          { task_name: "Harvesting", priority: 1, frequency: "once" },
          { task_name: "Drying and storage", priority: 1, frequency: "daily" },
        ],
      },
    ],
  },
  Onion: {
    crop_name: "Onion",
    duration_weeks: 12,
    weekly_schedule: [
      {
        week: 1,
        tasks: [
          { task_name: "Land preparation and bed formation", priority: 1, frequency: "once" },
          { task_name: "Apply basal fertilizer", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 2,
        tasks: [
          { task_name: "Transplant seedlings", priority: 1, frequency: "once" },
          { task_name: "Irrigation after transplanting", priority: 1, frequency: "once" },
        ],
      },
      {
        week: 3,
        tasks: [
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
          { task_name: "Light irrigation", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 4,
        tasks: [
          { task_name: "Top dressing (nitrogen)", priority: 1, frequency: "once" },
          { task_name: "Pest scouting (thrips)", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 5,
        tasks: [
          { task_name: "Irrigation management", priority: 2, frequency: "weekly" },
          { task_name: "Weeding", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 6,
        tasks: [
          { task_name: "Fertilization (potash)", priority: 2, frequency: "once" },
          { task_name: "Disease monitoring", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 7,
        tasks: [
          { task_name: "Bulb initiation irrigation", priority: 2, frequency: "weekly" },
          { task_name: "Pest control", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 8,
        tasks: [
          { task_name: "Weeding and soil loosening", priority: 2, frequency: "weekly" },
          { task_name: "Irrigation", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 9,
        tasks: [
          { task_name: "Reduce irrigation", priority: 2, frequency: "once" },
          { task_name: "Disease control", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 10,
        tasks: [
          { task_name: "Harvesting begins", priority: 1, frequency: "once" },
          { task_name: "Curing bulbs", priority: 1, frequency: "daily" },
        ],
      },
      {
        week: 11,
        tasks: [
          { task_name: "Continue harvesting", priority: 1, frequency: "weekly" },
          { task_name: "Grade and pack", priority: 2, frequency: "weekly" },
        ],
      },
      {
        week: 12,
        tasks: [
          { task_name: "Final harvest", priority: 1, frequency: "once" },
          { task_name: "Storage preparation", priority: 2, frequency: "once" },
        ],
      },
    ],
  },
};

module.exports = cropSchedules;
