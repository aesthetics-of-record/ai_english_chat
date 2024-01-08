// import { createClient } from '@supabase/supabase-js';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// next helper 을 통해 인증 기능을 사용할거면 같은 라이브러리의 client를 사용해야한다.

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// )

// export const supabaseAdmin = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
// )


// 인증 사용 시
export const supabase = createClientComponentClient();