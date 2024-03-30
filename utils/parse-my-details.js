export const parseMyDetails = (userDetails) => {
  const { purchase } = userDetails;
  let newProfile = { ...userDetails };

  if (purchase && Object.keys(purchase).length > 0) {
    newProfile.isFreeTrial = purchase.type === "free_trial";

    newProfile.planExpired =
      new Date().getTime() > new Date(purchase.expire_by).getTime();
  }

  let favorites = [];
  let readingBooks = [];
  let dueDates = [];

  if (userDetails.resources) {
    const { resources } = userDetails;

    for (const resource of resources) {
      if (resource.isFavorite) {
        favorites.push(resource.resource_id);
      }
      if (resource.status && resource.status === "inProgress") {
        readingBooks.push(resource);
      }
      if (
        resource.status !== "completed" &&
        resource.metaData &&
        resource.metaData?.dueDates?.length > 0
      ) {
        const dateObj = resource.metaData.dueDates.reduce(
          (earliest, current) => {
            const earliestDate = new Date(earliest.due_date);
            const currentDate = new Date(current.due_date);

            // Return the object with the earliest date
            return earliestDate < currentDate ? earliest : current;
          }
        );

        dueDates.push({
          resource_id: resource.resource_id,
          due_date: dateObj?.due_date || "",
          status: resource.status,
        });
      }
    }
  }

  newProfile.favorites = favorites;
  newProfile.dueDates = dueDates;
  newProfile.readingBooks = readingBooks;
  if (userDetails.orgDetails) {
    const { orgDetails } = userDetails;
    let features = {};
    if (orgDetails.features) {
      features = { ...orgDetails.features };
    }

    if (orgDetails.restrictions && orgDetails.restrictions.max_users) {
      const maxUsers = orgDetails.restrictions.max_users;
      if (maxUsers.unlimited === false) {
        newProfile.max_users = maxUsers;
      }
    }

    newProfile.features = features;
  }

  return newProfile;
};

export default parseMyDetails;
