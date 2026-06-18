import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-D72deLyy.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, b as booleanType, e as enumType, s as stringType, a as arrayType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const supabaseUrl = "https://ikxrzzdrnnruhgqykmde.supabase.co";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreHJ6emRybm5ydWhncXlrbWRlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTc3OTA4OCwiZXhwIjoyMDk3MzU1MDg4fQ.qeEOBh4OgmYePko-nCMbX0Vz9gfZ9EpOXQvClvIqM4w";
function getSupabaseServerClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
const settingsSchema = objectType({
  siteTitle: stringType().min(1),
  supportEmail: stringType().email(),
  defaultLanguage: enumType(["en", "am"]),
  autoPublish: booleanType(),
  notifyOnRegistration: booleanType()
});
const formSchema = objectType({
  category: stringType().min(1),
  titleEn: stringType().min(1),
  titleAm: stringType().min(1),
  keywords: stringType(),
  descriptionEn: stringType(),
  descriptionAm: stringType(),
  fileName: stringType(),
  youtubeUrl: stringType().url(),
  shareTo: arrayType(enumType(["YouTube", "TikTok", "Instagram", "Facebook"]))
});
const fallbackThumb = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80";
function normalizeYouTubeEmbedUrl(youtubeUrl) {
  if (!youtubeUrl) return "https://www.youtube.com/embed/NMYWBOTeg1I";
  const embedMatch = youtubeUrl.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`;
  }
  const watchMatch = youtubeUrl.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  const shortMatch = youtubeUrl.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }
  return youtubeUrl;
}
function getYouTubeThumbnail(youtubeUrl) {
  if (!youtubeUrl) return fallbackThumb;
  const embedMatch = youtubeUrl.match(/youtube\.com\/embed\/([^?&/]+)/i);
  if (embedMatch?.[1]) {
    return `https://img.youtube.com/vi/${embedMatch[1]}/hqdefault.jpg`;
  }
  const watchMatch = youtubeUrl.match(/[?&]v=([^?&/]+)/i);
  if (watchMatch?.[1]) {
    return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
  }
  const shortMatch = youtubeUrl.match(/youtu\.be\/([^?&/]+)/i);
  if (shortMatch?.[1]) {
    return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  }
  return fallbackThumb;
}
function mapVideoRow(post) {
  return {
    id: post.id,
    titleEn: post.title_en,
    titleAm: post.title_am,
    thumb: post.thumb || getYouTubeThumbnail(post.youtube_url),
    youtubeUrl: normalizeYouTubeEmbedUrl(post.youtube_url),
    duration: post.duration,
    views: post.views,
    channel: post.channel,
    channelAm: post.channel_am,
    category: post.category,
    postedDays: post.posted_days,
    status: post.status,
    createdAtLabel: post.created_at_label,
    keywords: post.keywords,
    descriptionEn: post.description_en,
    descriptionAm: post.description_am,
    shareTo: post.share_to,
    source: post.source
  };
}
const adminLogin_createServerFn_handler = createServerRpc({
  id: "c9ff09fb61254dc405f83219dbf36b90d7f1b262c39e4af58b715041fb0a761c",
  name: "adminLogin",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => adminLogin.__executeServer(opts));
const adminLogin = createServerFn({
  method: "POST"
}).validator(objectType({
  username: stringType(),
  password: stringType()
})).handler(adminLogin_createServerFn_handler, async ({
  data
}) => {
  if (data.username !== "admin" || data.password !== "admin123") {
    return {
      ok: false,
      message: "Invalid username or password."
    };
  }
  return {
    ok: true,
    user: {
      username: data.username,
      displayName: "Admin User"
    }
  };
});
const getAdminSnapshot_createServerFn_handler = createServerRpc({
  id: "d024c498ee47219bf19540338aeff4e41e5e62961925cb3aa80897dfc15e25bc",
  name: "getAdminSnapshot",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => getAdminSnapshot.__executeServer(opts));
const getAdminSnapshot = createServerFn({
  method: "GET"
}).handler(getAdminSnapshot_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const [{
    data: posts
  }, {
    data: registrations
  }, {
    data: settingsRow
  }] = await Promise.all([supabase.from("admin_videos").select("*").order("inserted_at", {
    ascending: false
  }), supabase.from("job_registrations").select("*").order("created_at", {
    ascending: false
  }), supabase.from("admin_settings").select("*").eq("id", 1).single()]);
  return {
    posts: posts?.map(mapVideoRow) ?? [],
    registrations: registrations?.map((item) => ({
      id: item.id,
      name: item.name,
      profession: item.profession,
      phone: item.phone,
      subCity: item.sub_city,
      status: item.status
    })) ?? [],
    settings: {
      siteTitle: settingsRow?.site_title ?? "Shamo Business Portal",
      supportEmail: settingsRow?.support_email ?? "admin@shamobusiness.com",
      defaultLanguage: settingsRow?.default_language ?? "en",
      autoPublish: settingsRow?.auto_publish ?? false,
      notifyOnRegistration: settingsRow?.notify_on_registration ?? true
    },
    notifications: registrations?.filter((item) => item.status === "New").length ?? 0
  };
});
const createAdminPost_createServerFn_handler = createServerRpc({
  id: "512cce003a8035bb33f8499c0212a28304c8a716dbed15b398ef1aefedb50cc3",
  name: "createAdminPost",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => createAdminPost.__executeServer(opts));
const createAdminPost = createServerFn({
  method: "POST"
}).validator(objectType({
  form: formSchema,
  status: enumType(["Draft", "Published", "Scheduled", "Review"])
})).handler(createAdminPost_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const form = data.form;
  const newPost = {
    id: `admin-${Date.now()}`,
    titleEn: form.titleEn,
    titleAm: form.titleAm,
    thumb: getYouTubeThumbnail(form.youtubeUrl),
    youtubeUrl: normalizeYouTubeEmbedUrl(form.youtubeUrl),
    duration: "00:00",
    views: 0,
    channel: "Shamo Admin",
    channelAm: "ሻሞ አስተዳዳሪ",
    category: form.category,
    postedDays: 0,
    status: data.status,
    createdAtLabel: "Just now",
    keywords: form.keywords,
    descriptionEn: form.descriptionEn,
    descriptionAm: form.descriptionAm,
    shareTo: form.shareTo,
    source: "admin"
  };
  await supabase.from("admin_videos").insert({
    id: newPost.id,
    title_en: newPost.titleEn,
    title_am: newPost.titleAm,
    thumb: newPost.thumb,
    youtube_url: newPost.youtubeUrl,
    duration: newPost.duration,
    views: newPost.views,
    channel: newPost.channel,
    channel_am: newPost.channelAm,
    category: newPost.category,
    posted_days: newPost.postedDays,
    status: newPost.status,
    created_at_label: newPost.createdAtLabel,
    keywords: newPost.keywords,
    description_en: newPost.descriptionEn,
    description_am: newPost.descriptionAm,
    share_to: newPost.shareTo,
    source: newPost.source
  });
  return {
    ok: true,
    post: newPost,
    message: data.status === "Published" ? "Video posted successfully and added to the recent posts table." : data.status === "Scheduled" ? "Video saved with scheduled status." : "Draft saved successfully."
  };
});
const getPublicVideos_createServerFn_handler = createServerRpc({
  id: "133678ee27a834c5ac321a1c4f61698de355f0052f15347b7a0de3bdc3fb356c",
  name: "getPublicVideos",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => getPublicVideos.__executeServer(opts));
const getPublicVideos = createServerFn({
  method: "GET"
}).handler(getPublicVideos_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    data
  } = await supabase.from("admin_videos").select("*").eq("status", "Published").order("inserted_at", {
    ascending: false
  });
  return data?.map(mapVideoRow) ?? [];
});
const getPublicVideoById_createServerFn_handler = createServerRpc({
  id: "96403100c70d80ecc2c543c699a80ca2f38c212b339efbd0656d8bcc44a43b1b",
  name: "getPublicVideoById",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => getPublicVideoById.__executeServer(opts));
const getPublicVideoById = createServerFn({
  method: "GET"
}).validator(objectType({
  id: stringType()
})).handler(getPublicVideoById_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data: post
  } = await supabase.from("admin_videos").select("*").eq("id", data.id).maybeSingle();
  return post ? mapVideoRow(post) : null;
});
const updateAdminPostStatus_createServerFn_handler = createServerRpc({
  id: "486835fefadcd7dc9cbc31c28ef0af78dc9582f018ec6de8c6f2171f69d48d22",
  name: "updateAdminPostStatus",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => updateAdminPostStatus.__executeServer(opts));
const updateAdminPostStatus = createServerFn({
  method: "POST"
}).validator(objectType({
  postId: stringType(),
  status: enumType(["Draft", "Published", "Scheduled", "Review"])
})).handler(updateAdminPostStatus_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  await supabase.from("admin_videos").update({
    status: data.status
  }).eq("id", data.postId);
  return {
    ok: true
  };
});
const deleteAdminPost_createServerFn_handler = createServerRpc({
  id: "cdd9242e4096d708b2a33b6a8dc518d7fc75dcea41d8339e7451b0321cff3c83",
  name: "deleteAdminPost",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => deleteAdminPost.__executeServer(opts));
const deleteAdminPost = createServerFn({
  method: "POST"
}).validator(objectType({
  postId: stringType()
})).handler(deleteAdminPost_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  await supabase.from("admin_videos").delete().eq("id", data.postId);
  return {
    ok: true
  };
});
const markAdminRegistrationReviewed_createServerFn_handler = createServerRpc({
  id: "0605ecdb5dd3d1f4e0199b45346d5f51b3a175edc153ef446b6fd8b2e5ad3197",
  name: "markAdminRegistrationReviewed",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => markAdminRegistrationReviewed.__executeServer(opts));
const markAdminRegistrationReviewed = createServerFn({
  method: "POST"
}).validator(objectType({
  registrationId: stringType()
})).handler(markAdminRegistrationReviewed_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  await supabase.from("job_registrations").update({
    status: "Reviewed"
  }).eq("id", data.registrationId);
  return {
    ok: true
  };
});
const saveAdminSettings_createServerFn_handler = createServerRpc({
  id: "dd60a78cadd3914acc296c74f428482695438f71f6339119b48711447f42defb",
  name: "saveAdminSettings",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => saveAdminSettings.__executeServer(opts));
const saveAdminSettings = createServerFn({
  method: "POST"
}).validator(settingsSchema).handler(saveAdminSettings_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  await supabase.from("admin_settings").upsert({
    id: 1,
    site_title: data.siteTitle,
    support_email: data.supportEmail,
    default_language: data.defaultLanguage,
    auto_publish: data.autoPublish,
    notify_on_registration: data.notifyOnRegistration
  });
  return {
    ok: true,
    settings: data
  };
});
const submitJobRegistration_createServerFn_handler = createServerRpc({
  id: "3a115788e453c1e76663cf6fc303ef2cab2ceed28333154090a4c7914e3cbb07",
  name: "submitJobRegistration",
  filename: "src/lib/api/admin.functions.ts"
}, (opts) => submitJobRegistration.__executeServer(opts));
const submitJobRegistration = createServerFn({
  method: "POST"
}).validator(objectType({
  id: stringType(),
  firstName: stringType(),
  lastName: stringType(),
  gender: stringType(),
  age: numberType(),
  lastWorkedIn: stringType(),
  profession: stringType(),
  subCity: stringType(),
  mobile1: stringType(),
  mobile2: stringType(),
  hasJob: stringType()
})).handler(submitJobRegistration_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  await supabase.from("job_registrations").insert({
    id: data.id,
    first_name: data.firstName,
    last_name: data.lastName,
    gender: data.gender,
    age: data.age,
    last_worked_in: data.lastWorkedIn,
    profession: data.profession,
    sub_city: data.subCity,
    mobile1: data.mobile1,
    mobile2: data.mobile2,
    has_job: data.hasJob,
    name: `${data.firstName} ${data.lastName}`,
    phone: data.mobile1,
    status: "New"
  });
  return {
    ok: true
  };
});
export {
  adminLogin_createServerFn_handler,
  createAdminPost_createServerFn_handler,
  deleteAdminPost_createServerFn_handler,
  getAdminSnapshot_createServerFn_handler,
  getPublicVideoById_createServerFn_handler,
  getPublicVideos_createServerFn_handler,
  markAdminRegistrationReviewed_createServerFn_handler,
  saveAdminSettings_createServerFn_handler,
  submitJobRegistration_createServerFn_handler,
  updateAdminPostStatus_createServerFn_handler
};
