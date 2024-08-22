import React, { useState } from 'react';

// Food data
const Food = [
    {
        name: "Banh beo",
        describe: "Món bánh làm từ bột gạo hấp chín, thường có nhân tôm cháy, mỡ hành và nước chấm chua ngọt.",
        ingredients: [
            "Bột gạo",
            "Tôm",
            "Hành lá",
            "Nước mắm",
            "Chanh",
            "Đường",
            "Ớt"
        ]
    },
    {
        name: "Banh bot loc",
        describe: "Bánh làm từ bột năng, có nhân tôm thịt đậm đà, gói trong lá chuối và hấp chín.",
        ingredients: [
            "Bột năng",
            "Tôm",
            "Thịt ba chỉ",
            "Hành tím",
            "Tỏi",
            "Nước mắm",
            "Tiêu",
            "Lá chuối"
        ]
    },
    {
        name: "Banh can",
        describe: "Bánh nhỏ làm từ bột gạo, đổ trong khuôn đất nung, có nhân tôm, mực, trứng và mỡ hành.",
        ingredients: [
            "Bột gạo",
            "Tôm",
            "Mực",
            "Trứng",
            "Hành lá",
            "Nước mắm",
            "Mỡ heo"
        ]
    },
    {
        name: "Banh canh",
        describe: "Món nước có sợi bánh canh làm từ bột gạo hoặc bột lọc, nước dùng đậm đà và có thể có nhiều loại topping như thịt, tôm, cua, chả cá.",
        ingredients: [
            "Bột gạo hoặc bột lọc",
            "Thịt (heo, gà, bò)",
            "Tôm",
            "Cua",
            "Chả cá",
            "Xương heo",
            "Hành tím",
            "Tỏi",
            "Nước mắm",
            "Muối",
            "Tiêu"
        ]
    },
    {
        name: "Banh chung",
        describe: "Món bánh truyền thống của Việt Nam, làm từ gạo nếp, đậu xanh, thịt heo, gói trong lá dong và luộc chín.",
        ingredients: [
            "Gạo nếp",
            "Đậu xanh",
            "Thịt heo",
            "Lá dong",
            "Hạt tiêu",
            "Hành tím",
            "Muối"
        ]
    },
    {
        name: "Banh cuon",
        describe: "Bánh làm từ bột gạo tráng mỏng, cuộn với nhân thịt băm, mộc nhĩ, hành phi và chấm nước mắm chua ngọt.",
        ingredients: [
            "Bột gạo",
            "Thịt heo băm",
            "Mộc nhĩ",
            "Hành tím",
            "Nước mắm",
            "Chanh",
            "Đường",
            "Ớt"
        ]
    },
    {
        name: "Banh duc",
        describe: "Bánh làm từ bột gạo, có độ mềm và dai, thường ăn kèm với nước chấm hoặc tương.",
        ingredients: [
            "Bột gạo",
            "Nước vôi trong",
            "Hành tím",
            "Nước mắm",
            "Chanh",
            "Đường",
            "Ớt"
        ]
    },
    {
        name: "Banh gio",
        describe: "Bánh làm từ bột gạo, có nhân thịt heo băm, mộc nhĩ, nấm hương, gói trong lá chuối và hấp chín.",
        ingredients: [
            "Bột gạo",
            "Thịt heo băm",
            "Mộc nhĩ",
            "Nấm hương",
            "Hành tím",
            "Tỏi",
            "Nước mắm",
            "Tiêu",
            "Lá chuối"
        ]
    },
    {
        name: "Banh khot",
        describe: "Bánh nhỏ làm từ bột gạo, chiên giòn, có nhân tôm và bột nghệ, ăn kèm rau sống và nước chấm.",
        ingredients: [
            "Bột gạo",
            "Tôm",
            "Bột nghệ",
            "Hành lá",
            "Nước mắm",
            "Rau sống"
        ]
    },
    {
        name: "Banh mi",
        describe: "Loại bánh mì đặc trưng của Việt Nam, thường dùng để kẹp các loại nhân như pate, chả lụa, thịt nướng, rau sống.",
        ingredients: [
            "Bột mì",
            "Men nở",
            "Đường",
            "Muối",
            "Sữa",
            "Bơ"
        ]
    },
    {
        name: "Banh tet",
        describe: "Tương tự bánh chưng nhưng có hình trụ dài, thường ăn vào dịp Tết.",
        ingredients: [
            "Gạo nếp",
            "Đậu xanh",
            "Thịt heo",
            "Lá chuối",
            "Hạt tiêu",
            "Hành tím",
            "Muối"
        ]
    },
    {
        name: "Banh trang nuong",
        describe: "Món ăn đường phố phổ biến, bánh tráng nướng trên than hồng, có nhiều loại topping như trứng, xúc xích, khô bò, hành phi.",
        ingredients: [
            "Bánh tráng",
            "Trứng",
            "Xúc xích",
            "Khô bò",
            "Hành phi",
            "Tương ớt",
            "Sốt mayonnaise"
        ]
    },
    {
        name: "Banh xeo",
        describe: "Bánh tráng mỏng làm từ bột gạo, chiên giòn, có nhân tôm, thịt, giá đỗ, ăn kèm rau sống và nước chấm.",
        ingredients: [
            "Bột gạo",
            "Tôm",
            "Thịt ba chỉ",
            "Giá đỗ",
            "Hành lá",
            "Nước mắm",
            "Rau sống"
        ]
    },
    {
        name: "Bun bo Hue",
        describe: "Món bún đặc trưng của Huế, có nước dùng đậm đà từ xương bò, thịt bò, chả cua, và các loại rau thơm.",
        ingredients: [
            "Bún",
            "Xương bò",
            "Thịt bò",
            "Chả cua",
            "Mắm ruốc",
            "Sả",
            "Ớt",
            "Rau thơm (húng quế, giá, bắp chuối, rau răm)"
        ]
    },
    {
        name: "Bun dau mam tom",
        describe: "Món ăn gồm bún lá, đậu hũ chiên, chả cốm, thịt luộc, lòng lợn, ăn kèm với mắm tôm và rau sống.",
        ingredients: [
            "Bún lá",
            "Đậu hũ",
            "Chả cốm",
            "Thịt heo luộc",
            "Lòng lợn",
            "Mắm tôm",
            "Rau sống",
            "Ớt, chanh"
        ]
    },
    {
        name: "Bun mam",
        describe: "Món bún có nước dùng làm từ mắm cá linh hoặc cá sặc, có thể có thêm thịt heo quay, chả cá, tôm, mực và rau sống.",
        ingredients: [
            "Bún",
            "Mắm cá linh hoặc cá sặc",
            "Thịt heo quay",
            "Chả cá",
            "Tôm",
            "Mực",
            "Rau sống (cà tím, rau muống, bắp chuối, giá)"
        ]
    },
    {
        name: "Bun rieu",
        describe: "Món bún có nước dùng từ cà chua, gạch cua, đậu hũ, riêu cua và thịt xay, ăn kèm rau sống.",
        ingredients: [
            "Bún",
            "Cà chua",
            "Gạch cua",
            "Đậu hũ",
            "Riêu cua",
            "Thịt heo xay",
            "Rau sống"
        ]
    },
    {
        name: "Bun thit nuong",
        describe: "Món bún có thịt heo nướng thơm ngon, ăn kèm với nước mắm chua ngọt, rau sống và đồ chua.",
        ingredients: [
            "Bún",
            "Thịt heo",
            "Nước mắm",
            "Chanh",
            "Đường",
            "Ớt",
            "Rau sống (xà lách, rau thơm)",
            "Đồ chua (cà rốt, củ cải)"
        ]
    },
    {
        name: "Ca kho to",
        describe: "Món cá kho đậm đà, thường dùng cá basa hoặc cá hú, kho trong nồi đất với nước màu, nước mắm, đường và tiêu.",
        ingredients: [
            "Cá basa hoặc cá hú",
            "Nước màu",
            "Nước mắm",
            "Đường",
            "Tiêu",
            "Hành tím",
            "Tỏi",
            "Ớt"
        ]
    },
    {
        name: "Canh chua",
        describe: "Món canh chua ngọt, thường nấu với cá basa hoặc cá lóc, có thêm cà chua, thơm, đậu bắp, bạc hà và rau thơm.",
        ingredients: [
            "Cá basa hoặc cá lóc",
            "Cà chua",
            "Thơm",
            "Đậu bắp",
            "Bạc hà (dọc mùng)",
            "Rau thơm (ngò gai, rau om)",
            "Me hoặc giấm",
            "Nước mắm",
            "Đường",
            "Muối"
        ]
    },
    {
        name: "Cao lau",
        describe: "Món mì đặc trưng của Hội An, có sợi mì màu vàng, ăn kèm với thịt heo xíu, tôm, rau sống và nước sốt đặc biệt.",
        ingredients: [
            "Mì cao lầu",
            "Thịt heo xíu",
            "Tôm",
            "Rau sống (giá, xà lách, rau thơm)",
            "Nước sốt cao lầu",
            "Tỏi phi",
            "Bánh tráng nướng"
        ]
    },
    {
        name: "Chao long",
        describe: "Món cháo nấu từ gạo, ăn kèm với lòng lợn, huyết, dồi, hành lá và tiêu.",
        ingredients: [
            "Gạo",
            "Lòng lợn",
            "Huyết",
            "Dồi",
            "Hành lá",
            "Tiêu",
            "Nước mắm",
            "Gừng"
        ]
    },
    {
        name: "Com tam",
        describe: "Món cơm nấu từ gạo tấm, ăn kèm với sườn nướng, bì, chả trứng, mỡ hành và nước mắm.",
        ingredients: [
            "Gạo tấm",
            "Sườn heo",
            "Bì",
            "Chả trứng",
            "Mỡ hành",
            "Nước mắm"
        ]
    },
    {
        name: "Goi cuon",
        describe: "Món cuốn làm từ bánh tráng, tôm luộc, thịt heo luộc, rau sống và bún, chấm nước mắm chua ngọt.",
        ingredients: [
            "Bánh tráng",
            "Tôm luộc",
            "Thịt heo luộc",
            "Rau sống",
            "Bún",
            "Nước mắm",
            "Chanh",
            "Đường",
            "Ớt"
        ]
    },
    {
        name: "Hu tieu",
        describe: "Món mì sợi làm từ bột gạo, có thể có nước hoặc khô, ăn kèm với thịt heo, tôm, mực và rau sống.",
        ingredients: [
            "Mì hủ tiếu",
            "Thịt heo",
            "Tôm",
            "Mực",
            "Rau sống",
            "Xương heo",
            "Hành tím",
            "Tỏi",
            "Nước mắm",
            "Muối",
            "Tiêu"
        ]
    },
    {
        name: "Mi quang",
        describe: "Món mì đặc trưng của Quảng Nam, có sợi mì màu vàng, ăn kèm với thịt heo, tôm, trứng, đậu phộng rang và bánh tráng nướng.",
        ingredients: [
            "Mì quảng",
            "Thịt heo",
            "Tôm",
            "Trứng",
            "Đậu phộng rang",
            "Bánh tráng nướng",
            "Nước sốt mì quảng",
            "Rau sống"
        ]
    },
    {
        name: "Nem chua",
        describe: "Món nem làm từ thịt heo xay, bì heo, tỏi, ớt, gói trong lá chuối và lên men tự nhiên.",
        ingredients: [
            "Thịt heo xay",
            "Bì heo",
            "Tỏi",
            "Ớt",
            "Lá chuối",
            "Gia vị (muối, đường, tiêu)"
        ]
    },
    {
        name: "Xoi xeo",
        describe: "Món xôi làm từ gạo nếp, có màu vàng từ đậu xanh đồ chín và mỡ hành.",
        ingredients: [
            "Gạo nếp",
            "Đậu xanh",
            "Hành lá",
            "Mỡ heo",
            "Muối"
        ]
    }
];

function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [foodDetails, setFoodDetails] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError(""); // Reset error message when file changes
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        setLoading(true);
        setError(""); // Reset error message before upload

        try {
            const response = await fetch('http://localhost:5000/upload_image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
                const food = Food.find(item => item.name === data.best_class_name);
                setFoodDetails(food);
            } else {
                setError('Upload failed: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setError('An error occurred while uploading the file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex p-8 max-w-7xl mx-auto space-x-12 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex-1 p-6 bg-slate-900 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
                <h2 className="text-3xl font-bold mb-6 text-white">Upload Image</h2>
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="block w-full mb-4 border border-gray-300 rounded-lg p-2 text-gray-700 transition-colors duration-300 hover:border-blue-500"
                />
                <button 
                    onClick={handleUpload}
                    disabled={loading} 
                    className={`w-full py-3 px-5 rounded-lg font-semibold text-white transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                
                {error && (
                    <div className="mt-4 text-red-500 font-medium">
                        {error}
                    </div>
                )}
            </div>
            {result && (
                <div className="flex-none w-96 bg-slate-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Prediction Result</h3>
                    <p className="mb-2"><strong className="text-gray-600">Best Class Name:</strong> {result.best_class_name}</p>
                    {result.image_url && (
                        <img 
                            src={result.image_url} 
                            alt="Uploaded" 
                            className="w-full h-auto rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105"
                        />
                    )}
                </div>
            )}
            {foodDetails && (
                <div className="flex-none w-full h-auto max-w-lg bg-slate-900 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Food Details</h3>
                    <h4 className="text-xl font-semibold mb-2 text-white">{foodDetails.name}</h4>
                    <p className="mb-4 text-white">{foodDetails.describe}</p>
                    <h5 className="font-semibold text-white mb-2">Ingredients:</h5>
                    <ul className="list-disc list-inside pl-5 text-white overflow-y-auto max-h-96">
                        {foodDetails.ingredients.map((ingredient, index) => (
                            <li key={index} className="break-words">{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UploadPage;