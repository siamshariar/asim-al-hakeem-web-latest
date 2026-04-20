import { youtube, constants, youtubeKeys } from "./config";
// Fix: Change import path from '../data/articles' to '../data/airticles-data'
import articles from "../data/airticles-data";
import { books } from "../data/books";
import { organizations } from "../data/organizations";
import { papers } from "../data/papers";
import { tafseers } from "../data/tafseers";
import { date } from "./format";
import { qna, qnCat } from "../data/qna";

const safeJsonItems = (data) => {
  if (data && Array.isArray(data.items)) {
    return data.items;
  }
  return [];
};

const safeTotalResults = (data) => {
  if (data && data.pageInfo && typeof data.pageInfo.totalResults === "number") {
    return data.pageInfo.totalResults;
  }
  const items = safeJsonItems(data);
  return items.length;
};

const safeNextPageToken = (data) => {
  return data && typeof data.nextPageToken === "string" ? data.nextPageToken : null;
};

// articles
const filterArticles = (items) => {
	let filtered = [];
	items.forEach((item) => {
		let obj = {
			id: item.id,
			postSlug: item.postSlug,
			postTitle: item.postTitle,
			imageSrc: item.imageSrc,
			postDate: item.postDate,
			postExcerpt: item.postExcerpt,
		};
		filtered.push(obj);
	});
	return filtered;
};

export const getHomeArticles = async () => {
	const items = articles.filter((item) => item.home === "1");
	return filterArticles(items);
};

export const getArticles = () => {
	return filterArticles(articles);
};

export const getRelatedArticles = () => {
	const items = articles.filter((item) => item.related === "1");
	return filterArticles(items);
};

export const getArticleDetails = (slug) => {
	const items = articles.filter((item) => item.postSlug === slug);
	return items[0];
};

export const getHomeQna = async () => {
	const items = qna.filter((item) => item.home === "1");
	return items;
};

// books
const filterBooks = (items) => {
	let filtered = [];
	items.forEach((item) => {
		let obj = {
			id: item.id,
			imageSrc: item.imageSrc,
			bookName: item.bookName,
			bookText: item.bookText,
			bookSlug: item.bookSlug,
			bookExcerpt: item.bookExcerpt,
			writer: item.writer,
		};
		filtered.push(obj);
	});
	return filtered;
};

export const getHomeBooks = async () => {
	const items = books.filter((item) => item.home === "1");
	return filterBooks(items);
};

export const getBooks = () => {
	return filterBooks(books);
};

export const getRelatedBooks = () => {
	const items = books.filter((item) => item.related === "1");
	return filterBooks(items);
};

export const getBookDetails = (slug) => {
	const items = books.filter((item) => item.bookSlug === slug);
	return items[0];
};

export const getHomeRecentLectures = async () => {
	const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.YOUTUBE_HOME_PAGE_RECENT_VIDEOS}`;
	const videoLists = await getYoutubeVideoListByUrl(url);
	return videoLists;
};

export const getHomeLectures = async () => {
	const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
	const lectures = await getYoutubeVideoListByUrl(url);
	return {
		videoLists: lectures.videoLists.videos.slice(0, 8),
		videoStats: lectures.videoLists.videoStats,
	};
};

export const getHeaderLectures = async () => {
	const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
	const lectures = await getYoutubeVideoListByUrl(url);
	return {
		videoLists: lectures.videoLists.videos.slice(0, 4),
		videoStats: lectures.videoLists.videoStats,
	};
};

// organizations
const filterOrganizations = (items) => {
	let filtered = [];
	items.forEach((item) => {
		let obj = {
			id: item.id,
			orgName: item.orgName,
			imageSrc: item.imageSrc,
			orgExcerpt: item.orgExcerpt,
			orgSlug: item.orgSlug,
		};
		filtered.push(obj);
	});
	return filtered;
};

export const getHomeOrganizations = async () => {
	const items = organizations.filter((item) => item.home === "1");
	return filterOrganizations(items);
};

export const getOrganizations = async () => {
	return filterOrganizations(organizations);
};

export const getOrganizationDetails = async (slug) => {
	const items = organizations.filter((item) => item.orgSlug === slug);
	return items[0];
};

// papers
const filterPapers = (items) => {
	let filtered = [];
	items.forEach((item) => {
		let obj = {
			id: item.id,
			catURL: item.catURL,
			catText: item.catText,
			postSlug: item.postSlug,
			postTitle: item.postTitle,
			postDate: item.postDate,
			link: item.link,
		};
		filtered.push(obj);
	});
	return filtered;
};

export const getHomePapers = async () => {
	const items = papers.filter((item) => item.home === "1");
	return filterPapers(items);
};

export const getPapers = () => {
	return filterPapers(papers);
};

export const getRelatedPapers = () => {
	const items = papers.filter((item) => item.related === "1");
	return filterPapers(items);
};

export const getPaperDetails = (slug) => {
	const items = papers.filter((item) => item.postSlug === slug);
	return items[0];
};

// tafseers
const filterTafseers = (items) => {
	let filtered = [];
	items.forEach((item) => {
		let obj = {
			id: item.id,
			imageSrc: item.imageSrc,
			catURL: item.catURL,
			catText: item.catText,
			postSlug: item.postSlug,
			postTitle: item.postTitle,
			postDate: item.postDate,
		};
		filtered.push(obj);
	});
	return filtered;
};

export const getTafseers = () => {
	return filterTafseers(tafseers);
};

export const getRelatedTafseers = () => {
	const items = tafseers.filter((item) => item.related === "1");
	return filterTafseers(items);
};

export const getTafseerDetails = (slug) => {
	const items = tafseers.filter((item) => item.postSlug === slug);
	return items[0];
};

export const getAllPlaylists2 = async () => {
	const url = `${youtube.url}/playlists?key=${youtube.key}&part=snippet&channelId=${youtube.channelID}&maxResults=${constants.MAX_YOUTUBE_PAGE_LIMIT}`;
	const res = await getYoutubeResponseByUrl(url);
  
	let data = await res.json();
	if (!data || !Array.isArray(data.items)) {
	  console.error('Unexpected API response format:', data);
	  return { playlists: [], playlistsTitle: {} };
	}
  
	let items = data.items;
	const total = safeTotalResults(data);
  
	if (total > 50 && data.nextPageToken) {
	  const numberOfRequests = Math.ceil(total / 50);
	  for (let i = 1; i < numberOfRequests; i++) {
		let newURL = url + `&pageToken=${data.nextPageToken}`;
		let newRes = await getYoutubeResponseByUrl(newURL);
		data = await newRes.json();
  
		if (!data || !Array.isArray(data.items)) {
		  console.error('Unexpected API response format during pagination:', data);
		  break;
		}
  
		items = items.concat(data.items);
	  }
	}
  
	let playlists = [];
	let playlistsTitle = {};
  
	let obj = {
	  id: youtube.uploadPlaylistID,
	  title: "Video Lectures",
	};
	playlists.push(obj);
	playlistsTitle[youtube.uploadPlaylistID] = "Video Lectures";
  
	items.forEach((item) => {
	  if (item && item.snippet) {
		let obj = {
		  id: item.id,
		  title: item.snippet.title,
		};
		playlists.push(obj);
		playlistsTitle[item.id] = item.snippet.title;
	  } else {
		console.error('Undefined item or item.snippet encountered:', item);
	  }
	});
  
	return { playlists, playlistsTitle };
};

export const getYoutubeVideoListByUrl = async (url) => {
	const response = await getYoutubeResponseByUrl(url);
	const videosData = await response.json();
	const videoItems = safeJsonItems(videosData);
	const nextPageToken = safeNextPageToken(videosData);
	const totalVideos = safeTotalResults(videosData);
	const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
	let videos = [];
	let videoIds = "";

	videoItems.forEach((item) => {
		if (!item || !item.snippet) return;
		const title = item.snippet.title?.toString() || "";
		if (
			title === "Private watch" ||
			title === "Private video" ||
			title === "Deleted video"
		) {
			return;
		}
		let image =
			typeof item.snippet.thumbnails?.high !== "undefined"
				? item.snippet.thumbnails.high.url
				: "";
		let obj = {
			id: item.snippet.resourceId?.videoId || "",
			image: image,
			title: title,
			date: item.snippet.publishedAt,
			playlistId: item.snippet.playlistId,
		};
		videos.push(obj);
		if (item.snippet.resourceId?.videoId) {
			videoIds += "," + item.snippet.resourceId.videoId;
		}
	});

	let videoStatistics = {};
	if (videoIds) {
		const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
		const statsRes = await getYoutubeResponseByUrl(statsURL);
		const videoStats = await statsRes.json();
		if (videoStats && Array.isArray(videoStats.items)) {
			videoStats.items.forEach((item) => {
				if (item?.id && item?.statistics?.viewCount) {
					videoStatistics[item.id] = item.statistics.viewCount;
				}
			});
		}
	}

	let videoLists = {
		nextPageToken: nextPageToken,
		numberOfPages: numberOfPages,
		videos: videos,
		videoStats: videoStatistics,
	};

	return { videoLists };
};

export const getRelatedYoutubeVideoListByUrl = async (url) => {
	const response = await getYoutubeResponseByUrl(url);
	const videosData = await response.json();
	const videoItems = safeJsonItems(videosData);
	const nextPageToken = safeNextPageToken(videosData);
	const totalVideos = safeTotalResults(videosData);
	const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
	let videos = [];
	let videoIds = "";

	videoItems.forEach((item) => {
		if (!item || !item.snippet) return;
		const title = item.snippet.title?.toString() || "";
		if (title === "Private watch" || title === "Private video" || title === "Deleted video") {
			return;
		}
		let image =
			typeof item.snippet.thumbnails?.high !== "undefined"
				? item.snippet.thumbnails.high.url
				: "";
		let obj = {
			id: item.snippet.resourceId?.videoId || item.id?.videoId || "",
			image: image,
			title: title,
			date: item.snippet.publishedAt,
			playlistId: item.snippet.playlistId,
		};
		videos.push(obj);
		if (item.snippet.resourceId?.videoId) {
			videoIds += "," + item.snippet.resourceId.videoId;
		} else if (item.id?.videoId) {
			videoIds += "," + item.id.videoId;
		}
	});

	let videoStatistics = {};
	if (videoIds) {
		const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
		const statsRes = await getYoutubeResponseByUrl(statsURL);
		const videoStats = await statsRes.json();
		if (videoStats && Array.isArray(videoStats.items)) {
			videoStats.items.forEach((item) => {
				if (item?.id && item?.statistics?.viewCount) {
					videoStatistics[item.id] = item.statistics.viewCount;
				}
			});
		}
	}

	let videoLists = {
		nextPageToken: nextPageToken,
		numberOfPages: numberOfPages,
		videos: videos,
		videoStats: videoStatistics,
	};

	return { videoLists };
};

export const getUploadPlaylistVideos = async () => {
	const url = `${youtube.url}/playlistItems?key=${youtube.key}&part=snippet&playlistId=${youtube.uploadPlaylistID}&maxResults=${constants.MAX_YOUTUBE_PAGE_LIMIT}`;
	const res = await getYoutubeResponseByUrl(url);

	let data = await res.json();
	let videoItems = safeJsonItems(data);

	const total = safeTotalResults(data);
	let videoIdList = [];

	if (total > 50 && data.nextPageToken) {
		const numberOfRequests = Math.ceil(total / 50);
		for (let i = 1; i < numberOfRequests; i++) {
			let newURL = url + `&pageToken=${data.nextPageToken}`;
			let newRes = await getYoutubeResponseByUrl(newURL);
			data = await newRes.json();
			let newItems = safeJsonItems(data);
			videoItems = videoItems.concat(newItems);
		}
	}

	videoItems.forEach((item) => {
		if (!item || !item.snippet) return;
		const title = item.snippet.title?.toString() || "";
		if (title === "Private watch" || title === "Private video" || title === "Deleted video") {
			return;
		}
		if (item.snippet.resourceId?.videoId) {
			let obj = {
				id: item.snippet.resourceId.videoId,
			};
			videoIdList.push(obj);
		}
	});

	return { videoIdList };
};

export const getYoutubeVideoDetailsByUrl = async (url) => {
	const res = await getYoutubeResponseByUrl(url);
	const data = await res.json();

	let title = "";
	let description = "";
	let publishedDate = "";
	let image = "";
	let viewCount = "";

	const video = data && Array.isArray(data.items) && data.items[0];
	if (video && video.snippet) {
		title = video.snippet.title || "";
		description = video.snippet.description || "";
		publishedDate = video.snippet.publishedAt ? date(video.snippet.publishedAt) : "";
		image =
			typeof video.snippet.thumbnails?.high !== "undefined"
				? video.snippet.thumbnails.high.url
				: "";
		viewCount = video.statistics?.viewCount || "";
	}

	return { title, description, publishedDate, image, viewCount };
};

const replaceYoutubeKeyFromUrl = (url, key) => {
	const newUrl = url.replace(
		new RegExp("key([^&]*)&", "gm"),
		"key=" + key + "&"
	);
	return newUrl;
};

const fetchUrl = async (url) => {
	return await fetch(url);
};

const getYoutubeResponseByUrl = async (url) => {
	let res = await fetchUrl(url);
	const currentKey = youtube.key;

	if (res.status == 403) {
		for (let key in youtubeKeys) {
			if (currentKey !== youtubeKeys[key]) {
				youtube.key = youtubeKeys[key];
				res = await fetchUrl(replaceYoutubeKeyFromUrl(url, youtube.key));
				if (res.status == 200) {
					break;
				}
			}
		}
	}

	return res;
};

export const getYoutubeSearchVideosByUrl = async (url) => {
	const response = await getYoutubeResponseByUrl(url);
	const videosData = await response.json();
	const videoItems = safeJsonItems(videosData);
	const nextPageToken = safeNextPageToken(videosData);
	const totalVideos = safeTotalResults(videosData);
	const numberOfPages = Math.ceil(totalVideos / constants.DEFAULT_PAGE_LIMIT);
	let videos = [];
	let videoIds = "";

	videoItems.forEach((item) => {
		if (!item || !item.snippet || !item.id?.videoId) return;
		const title = item.snippet.title?.toString() || "";
		if (
			title === "Private watch" ||
			title === "Private video" ||
			title === "Deleted video"
		) {
			return;
		}
		let image =
			typeof item.snippet.thumbnails?.high !== "undefined"
				? item.snippet.thumbnails.high.url
				: "";
		let obj = {
			id: item.id.videoId,
			image: image,
			title: title,
			date: item.snippet.publishedAt,
		};
		videos.push(obj);
		videoIds += "," + item.id.videoId;
	});

	let videoStatistics = {};
	if (videoIds) {
		const statsURL = `${youtube.url}/videos?key=${youtube.key}&part=statistics&id=${videoIds}&maxResults=${constants.DEFAULT_PAGE_LIMIT}`;
		const statsRes = await getYoutubeResponseByUrl(statsURL);
		const videoStats = await statsRes.json();
		if (videoStats && Array.isArray(videoStats.items)) {
			videoStats.items.forEach((item) => {
				if (item?.id && item?.statistics?.viewCount) {
					videoStatistics[item.id] = item.statistics.viewCount;
				}
			});
		}
	}

	let videoLists = {
		nextPageToken: nextPageToken,
		numberOfPages: numberOfPages,
		videos: videos,
		videoStats: videoStatistics,
	};

	return { videoLists };
};

export const getOptHomeImages = async () => {
	const items = tafseers.slice(3, 6);
	return filterTafseers(items);
};

export const getOptHomeBlogs = async () => {
	const items = tafseers.slice(0, 4);
	return filterTafseers(items);
};

const quotes = [
	{
		id: 1,
		image: "/img/slider/01.jpg",
		text: "The life of this world is merely enjoyment of delusion",
		author: "Quran 3:185",
	},
	{
		id: 2,
		image: "/img/slider/02.jpg",
		text: "Indeed, the patient will be given their reward without account",
		author: "Quran 39:10",
	},
	{
		id: 3,
		image: "/img/slider/03.jpg",
		text: "So remember Me; I will remember you. And be grateful to Me and do not deny Me",
		author: "Quran 02:152",
	},
];

export const getOptHomeQuotes = async () => {
	const items = quotes.slice(0, 3);
	return items;
};

export const getOptHomeBooks = async () => {
	const items = books.filter((item) => item.opt_home === "1");
	return filterBooks(items);
};

export const getHome3Posts4 = async () => {
	const items = tafseers.slice(0, 4);
	return filterTafseers(items);
};

export const qaFetcher = async (...args) => {
	return await getAllQuestions(JSON.parse(args));
};

export const getAllQuestions = async (obj) => {
	let currentPage = obj.currentPage;
	let cat_slug = obj.cat_slug;
	let dataSet = [];

	if (cat_slug == "all") {
		dataSet = qna;
	} else {
		dataSet = qna.filter((item) => item.cat_slug == cat_slug);
	}

	const totalItems = dataSet.length;
	let maxResult = constants.DEFAULT_PAGE_LIMIT ? constants.DEFAULT_PAGE_LIMIT : 50;
	const numberOfPages = Math.ceil(totalItems / maxResult);

	let index, offSet;

	if (currentPage == 1 || currentPage <= 0) {
		index = 0;
		offSet = maxResult;
	} else if (currentPage > dataSet.length) {
		index = currentPage - 1;
		offSet = dataSet.length;
	} else {
		index = currentPage * maxResult - maxResult;
		offSet = index + maxResult;
	}

	const slicedItems = dataSet.slice(index, offSet);
	return { qaItems: slicedItems, numberOfPages, currentPage };
};

export const getQnaByLimit = async (num) => {
	if (num && num > 0) {
		return qna.slice(0, num);
	} else return qna.slice(0, constants.GENERATED_ANS_PAGE);
};

export const getQnCatTitle = async (param) => {
	if (param !== "all") {
		const items = qnCat.filter((item) => item.slug === param);
		return items.length > 0 ? items[0].title : "";
	} else return "All Questions";
};

export const getAnsById = async (id) => {
	return qna.filter((item) => item.id == id);
};

export const getAllQnaCategory = async () => {
	let allQnCat = [
		{
			id: 0,
			title: "All Questions",
			slug: "all",
		},
	];
	allQnCat.push(...qnCat);
	return allQnCat;
};
